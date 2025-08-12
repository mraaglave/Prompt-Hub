const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const path = require('path'); // Added for path.join

const app = express();
const PORT = process.env.PORT || 3000;

// Load API key from .env
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("❌ Missing GEMINI_API_KEY in .env file");
    process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files with proper MIME types
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html');
        }
    }
}));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Prompt Enhancer API is running' });
});

// Enhance prompt endpoint
app.post('/api/enhance-prompt', async (req, res) => {
    try {
        const { prompt, options = {} } = req.body;

        if (!prompt || prompt.trim() === '') {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const enhancementInstruction = buildEnhancementInstruction(prompt, options);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(enhancementInstruction);
        let enhancedPrompt = result?.response?.text()?.trim() || "Prompt enhancement failed.";
        
        // Safety check: Ensure we got an enhanced prompt, not generated content
        enhancedPrompt = validateAndCleanEnhancedPrompt(enhancedPrompt, prompt);

        res.json({
            success: true,
            originalPrompt: prompt,
            enhancedPrompt,
            options,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error enhancing prompt:', error);
        res.status(500).json({ error: 'Failed to enhance prompt', message: error.message });
    }
});

// Instruction builder
function buildEnhancementInstruction(prompt, options) {
    let instruction = `You are a professional prompt enhancement specialist. Your ONLY task is to improve the given prompt, not to fulfill it.

🚨 CRITICAL INSTRUCTIONS:
- DO NOT write essays, articles, code, stories, or any content
- DO NOT answer questions or complete tasks
- ONLY improve the prompt itself to make it clearer and more effective
- Return ONLY the enhanced version of the original prompt

Original prompt to enhance: "${prompt}"

Your enhancement should:
✅ Fix spelling and grammar errors
✅ Make the request clearer and more specific
✅ Add helpful context or structure
✅ Improve clarity and effectiveness
✅ Make it more actionable for AI assistants

Example:
- Input: "write eassy about dogs"
- Enhanced: "Write a well-structured essay about dogs, including their history, breeds, and relationship with humans. The essay should be informative and suitable for a general audience."

`;

    // Add scenario context
    if (options.scenario) {
        const scenarioMappings = {
            storytelling: "This prompt is for creative storytelling purposes",
            coding: "This prompt is for programming and development help", 
            marketing: "This prompt is for marketing and promotional content",
            business: "This prompt is for business and professional use",
            educational: "This prompt is for educational and learning purposes",
            creative: "This prompt is for creative and artistic projects"
        };
        instruction += `Context: ${scenarioMappings[options.scenario] || options.scenario}\n`;
    }
    
    // Add tone requirements
    if (options.tone) {
        const toneMappings = {
            friendly: "The response should be warm and approachable",
            expert: "The response should demonstrate professional expertise",
            humorous: "The response should include humor and wit", 
            creative: "The response should be creative and imaginative",
            empathetic: "The response should be understanding and compassionate",
            analytical: "The response should be detailed and logical"
        };
        instruction += `Desired tone: ${toneMappings[options.tone] || options.tone}\n`;
    }
    
    // Add length preference
    const lengthMappings = {
        short: "The response should be concise and brief",
        medium: "The response should be moderate in length", 
        long: "The response should be comprehensive and detailed"
    };
    instruction += `Length preference: ${lengthMappings[options.length] || 'moderate in length'}\n`;
    
    // Add toggle options
    if (options.toggles) {
        const activeToggles = [];
        if (options.toggles.sources) activeToggles.push('Include request for sources and references');
        if (options.toggles.stepbystep) activeToggles.push('Request step-by-step instructions');
        if (options.toggles.seo) activeToggles.push('Make it SEO-friendly');
        if (options.toggles.examples) activeToggles.push('Request practical examples');
        
        if (activeToggles.length > 0) {
            instruction += `Additional requirements: ${activeToggles.join(', ')}\n`;
        }
    }
    
    instruction += `\nReturn ONLY the enhanced prompt text, nothing else.`;
    
    return instruction;
}

// Safety validation function
function validateAndCleanEnhancedPrompt(enhancedPrompt, originalPrompt) {
    // Remove any introductory phrases that might indicate content generation
    const cleanedPrompt = enhancedPrompt
        .replace(/^(Here's the enhanced prompt:|Enhanced prompt:|Here's an improved version:|Here is the enhanced prompt:)/i, '')
        .replace(/^(Sure! |Of course! |Certainly! |Here you go: |Let me help you: )/i, '')
        .trim();
    
    // Check if the response is suspiciously long (might be generated content)
    const words = cleanedPrompt.split(' ').length;
    const originalWords = originalPrompt.split(' ').length;
    
    // If the "enhanced" prompt is more than 10x longer than original, it might be generated content
    if (words > Math.max(originalWords * 10, 200)) {
        console.log('Warning: Response might be generated content, applying fallback enhancement');
        return applyFallbackEnhancement(originalPrompt);
    }
    
    // Check for signs of content generation rather than prompt enhancement
    const contentGenerationSigns = [
        /^(Dogs are|Cats are|AI is|Machine learning is|The answer is|To understand)/i,
        /^(In this essay|This article|This story|Once upon a time)/i,
        /^(Introduction:|Conclusion:|Chapter|Section)/i,
        /^(function |def |class |import |#include)/i  // Code indicators
    ];
    
    for (const sign of contentGenerationSigns) {
        if (sign.test(cleanedPrompt)) {
            console.log('Warning: Detected content generation, applying fallback enhancement');
            return applyFallbackEnhancement(originalPrompt);
        }
    }
    
    return cleanedPrompt;
}

// Fallback enhancement when AI misbehaves
function applyFallbackEnhancement(originalPrompt) {
    // Basic grammar and spelling corrections
    let enhanced = originalPrompt
        .replace(/\b(eassy|esay)\b/gi, 'essay')
        .replace(/\b(machien|machina)\b/gi, 'machine')
        .replace(/\b(lerning|learnig)\b/gi, 'learning')
        .replace(/\b(algorthms|algoritms)\b/gi, 'algorithms')
        .replace(/\b(explian|explan)\b/gi, 'explain')
        .replace(/\boi\b/gi, 'on')
        .replace(/\btheea\b/gi, 'the')
        .replace(/\bClassmut\b/gi, 'Classmate');
    
    // Ensure it starts with a capital letter
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
    
    // Add basic structure if it's too vague
    if (enhanced.split(' ').length < 5) {
        enhanced = `Please provide a detailed response about "${enhanced}". Include relevant context, examples, and specific information to make the response comprehensive and helpful.`;
    }
    
    return enhanced;
}

// Error handling
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Catch-all route for SPA - serve index.html for any unmatched routes (must be last)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Prompt Enhancer server running on http://localhost:${PORT}`);
    });
}

// Export for Vercel serverless functions
module.exports = app;

