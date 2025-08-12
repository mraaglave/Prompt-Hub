// Prompt Hub - JavaScript Functionality
// Author: AI Assistant
// Version: 1.0

class PromptHub {
    constructor() {
        this.promptCount = 0;
        this.sessionHistory = [];
        this.donationSkipped = false;
        this.isProcessing = false;
        this.selectedOptions = {
            scenario: null,
            tone: null,
            length: 'medium',
            toggles: {
                sources: false,
                stepbystep: false,
                seo: false,
                examples: false
            }
        };
        
        this.presetPrompts = {
            storytelling: "Write a compelling story about",
            marketing: "Create a marketing campaign for",
            code: "Help me write code to",
            business: "Create a business plan for"
        };
        
        this.toneMappings = {
            friendly: "in a warm, approachable tone",
            expert: "with professional expertise and authority",
            humorous: "with humor and wit",
            creative: "with creativity and imagination",
            empathetic: "with understanding and compassion",
            analytical: "with detailed analysis and logic"
        };
        
        this.scenarioMappings = {
            storytelling: "For creative storytelling purposes",
            coding: "For programming and development",
            marketing: "For marketing and promotional content",
            business: "For business and professional use",
            educational: "For educational and learning purposes",
            creative: "For creative and artistic projects"
        };

        this.lengthMappings = {
            short: "Keep the response concise and brief",
            medium: "Provide a moderate-length response",
            long: "Give a comprehensive and detailed response"
        };
        
        this.init();
    }

    init() {
        this.loadSessionData();
        this.bindEvents();
        this.updatePromptCounter();
        this.initNavigation();
        console.log('Prompt Hub initialized successfully');
    }

    // Session Management
    loadSessionData() {
        const savedCount = sessionStorage.getItem('promptCount');
        const savedHistory = sessionStorage.getItem('promptHistory');
        
        if (savedCount) {
            this.promptCount = parseInt(savedCount, 10);
        }
        
        if (savedHistory) {
            try {
                this.sessionHistory = JSON.parse(savedHistory);
                this.renderHistory();
            } catch (e) {
                console.error('Error loading session history:', e);
                this.sessionHistory = [];
            }
        }
    }

    saveSessionData() {
        sessionStorage.setItem('promptCount', this.promptCount.toString());
        sessionStorage.setItem('promptHistory', JSON.stringify(this.sessionHistory));
    }

    // Event Binding
    bindEvents() {
        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', this.toggleMobileNav.bind(this));
        }

        // Send button
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', this.processPrompt.bind(this));
        }

        // Plus button for options
        const plusBtn = document.getElementById('plusBtn');
        if (plusBtn) {
            plusBtn.addEventListener('click', this.showOptionsPopup.bind(this));
        }

        // Input field enter key
        const promptInput = document.getElementById('promptInput');
        if (promptInput) {
            promptInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.processPrompt();
                }
            });
        }

        // Popup close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-popup')) {
                this.closePopup(e.target.closest('.popup-overlay'));
            }
        });

        // Apply options button
        const applyBtn = document.getElementById('applyOptions');
        if (applyBtn) {
            applyBtn.addEventListener('click', this.applyOptions.bind(this));
        }

        // Continue trial button
        const continueBtn = document.getElementById('continueTrial');
        if (continueBtn) {
            continueBtn.addEventListener('click', this.continueTrial.bind(this));
        }

        // Preset buttons
        const presetBtns = document.querySelectorAll('.preset-btn');
        presetBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.applyPreset(preset);
            });
        });

        // Option buttons in popup
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-btn')) {
                this.selectOption(e.target);
            }
        });

        // Toggle switches
        document.addEventListener('change', (e) => {
            if (e.target.hasAttribute('data-toggle')) {
                const toggle = e.target.dataset.toggle;
                this.selectedOptions.toggles[toggle] = e.target.checked;
            }
        });

        // History toggle
        const toggleHistory = document.getElementById('toggleHistory');
        if (toggleHistory) {
            toggleHistory.addEventListener('click', this.toggleHistory.bind(this));
        }

        // History item clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.history-item')) {
                const historyItem = e.target.closest('.history-item');
                const text = historyItem.querySelector('.history-item-text').textContent;
                document.getElementById('promptInput').value = text;
            }
        });

        // Copy buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
                const btn = e.target.classList.contains('copy-btn') ? e.target : e.target.closest('.copy-btn');
                this.copyToClipboard(btn);
            }
        });

        // Close popup on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-overlay')) {
                this.closePopup(e.target);
            }
        });
    }

    // Navigation
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.showSection(target);
                this.setActiveNavLink(link);
            });
        });
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    toggleMobileNav() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    }

    // Main Functionality
    showPromptInterface() {
        this.showSection('prompt-interface');
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#prompt-interface') {
                this.setActiveNavLink(link);
            }
        });
    }

    async processPrompt() {
        if (this.isProcessing) return;
        
        const promptInput = document.getElementById('promptInput');
        const sendBtn = document.getElementById('sendBtn');
        const userPrompt = promptInput.value.trim();
        
        if (!userPrompt) {
            this.showMessage('Please enter a prompt first.', 'error');
            return;
        }

        // Check if user has reached the limit and hasn't skipped donation
        if (this.promptCount >= 5 && !this.donationSkipped) {
            this.showDonationPopup();
            return;
        }

        this.isProcessing = true;
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        this.addMessage('user', userPrompt);
        
        // Show loading animation
        this.showLoadingAnimation();
        
        try {
            const enhancedPrompt = await this.enhancePromptWithAI(userPrompt);
            this.addMessage('bot', enhancedPrompt, true);
        } catch (error) {
            console.error('Error enhancing prompt:', error);
            const fallbackPrompt = this.enhancePrompt(userPrompt);
            this.addMessage('bot', fallbackPrompt, true);
        } finally {
            this.hideLoadingAnimation();
            this.isProcessing = false;
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }

        // Update counters and history
        this.promptCount++;
        this.updatePromptCounter();
        this.addToHistory(userPrompt);
        this.saveSessionData();

        // Clear input
        promptInput.value = '';
        this.resetOptions();
    }

    enhancePrompt(originalPrompt) {
        let enhanced = originalPrompt;
        
        // Add scenario context
        if (this.selectedOptions.scenario) {
            const scenarioContext = this.scenarioMappings[this.selectedOptions.scenario];
            if (scenarioContext) {
                enhanced = `${scenarioContext}: ${enhanced}`;
            }
        }

        // Add tone instruction
        if (this.selectedOptions.tone) {
            const toneInstruction = this.toneMappings[this.selectedOptions.tone];
            if (toneInstruction) {
                enhanced += ` Please respond ${toneInstruction}.`;
            }
        }

        // Add length instruction
        const lengthInstruction = this.lengthMappings[this.selectedOptions.length];
        enhanced += ` ${lengthInstruction}.`;

        // Add toggle options
        const toggleInstructions = [];
        if (this.selectedOptions.toggles.sources) {
            toggleInstructions.push('Include relevant sources and references');
        }
        if (this.selectedOptions.toggles.stepbystep) {
            toggleInstructions.push('Provide step-by-step instructions');
        }
        if (this.selectedOptions.toggles.seo) {
            toggleInstructions.push('Make it SEO-friendly');
        }
        if (this.selectedOptions.toggles.examples) {
            toggleInstructions.push('Include practical examples');
        }

        if (toggleInstructions.length > 0) {
            enhanced += ` Additional requirements: ${toggleInstructions.join(', ')}.`;
        }

        return enhanced;
    }

    generateResponse(prompt) {
        // This is a mock response generator for the trial version
        const responses = [
            "Here's your enhanced prompt response! This is a simulated AI response that demonstrates how your enhanced prompt would work with a real AI service.",
            "Your prompt has been processed with the selected enhancements. In the full version, this would be sent to a real AI API for processing.",
            "Enhanced prompt received! The system has applied your chosen scenario, tone, and length preferences to optimize the response.",
            "This is a demo response showing how your enhanced prompt would appear. The actual implementation would integrate with OpenAI, Claude, or other AI services.",
            "Great prompt! Your enhancements have been applied successfully. This preview shows how the enhanced prompt would generate better, more targeted responses."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(type, content, showCopy = false) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        
        const avatar = document.createElement('div');
        avatar.className = type === 'user' ? 'user-avatar' : 'bot-avatar';
        avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        if (showCopy) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.title = 'Copy to clipboard';
            messageContent.appendChild(copyBtn);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    copyToClipboard(btn) {
        const messageContent = btn.closest('.message-content');
        const textToCopy = messageContent.querySelector('p').textContent;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                this.showMessage('Copied to clipboard!', 'success');
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(() => {
                this.fallbackCopy(textToCopy, btn);
            });
        } else {
            this.fallbackCopy(textToCopy, btn);
        }
    }

    fallbackCopy(text, btn) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showMessage('Copied to clipboard!', 'success');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            this.showMessage('Failed to copy text', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    showMessage(message, type = 'info') {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#f87171' : type === 'success' ? '#4ade80' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Options and Presets
    showOptionsPopup() {
        const popup = document.getElementById('plusPopup');
        if (popup) {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closePopup(popup) {
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    applyPreset(preset) {
        const promptInput = document.getElementById('promptInput');
        const presetText = this.presetPrompts[preset];
        
        if (presetText && promptInput) {
            promptInput.value = presetText;
            promptInput.focus();
            
            // Set scenario based on preset
            this.selectedOptions.scenario = preset === 'code' ? 'coding' : preset;
        }
    }

    selectOption(btn) {
        const option = btn.dataset.option;
        const value = btn.dataset.value;
        
        // Remove active class from siblings
        const siblings = btn.parentElement.querySelectorAll('.option-btn');
        siblings.forEach(sibling => sibling.classList.remove('active'));
        
        // Add active class to selected button
        btn.classList.add('active');
        
        // Update selected options
        this.selectedOptions[option] = value;
    }

    applyOptions() {
        this.closePopup(document.getElementById('plusPopup'));
        this.showMessage('Options applied successfully!', 'success');
    }

    resetOptions() {
        // Reset option buttons
        const optionBtns = document.querySelectorAll('.option-btn.active');
        optionBtns.forEach(btn => btn.classList.remove('active'));
        
        // Reset toggles
        const toggles = document.querySelectorAll('input[data-toggle]');
        toggles.forEach(toggle => toggle.checked = false);
        
        // Reset selected options
        this.selectedOptions = {
            scenario: null,
            tone: null,
            length: 'medium',
            toggles: {
                sources: false,
                stepbystep: false,
                seo: false,
                examples: false
            }
        };
    }

    // History Management
    addToHistory(prompt) {
        this.sessionHistory.unshift({
            text: prompt,
            timestamp: new Date().toISOString()
        });
        
        // Limit history to 10 items
        if (this.sessionHistory.length > 10) {
            this.sessionHistory = this.sessionHistory.slice(0, 10);
        }
        
        this.renderHistory();
    }

    renderHistory() {
        const historyContent = document.getElementById('historyContent');
        if (!historyContent) return;
        
        if (this.sessionHistory.length === 0) {
            historyContent.innerHTML = '<p class="no-history">No prompts in this session yet.</p>';
            return;
        }
        
        historyContent.innerHTML = this.sessionHistory
            .map(item => `
                <div class="history-item">
                    <div class="history-item-text">${this.truncateText(item.text, 60)}</div>
                </div>
            `).join('');
    }

    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    toggleHistory() {
        const historyContent = document.getElementById('historyContent');
        const toggleBtn = document.getElementById('toggleHistory');
        
        if (historyContent && toggleBtn) {
            const isCollapsed = historyContent.classList.contains('collapsed');
            
            if (isCollapsed) {
                historyContent.classList.remove('collapsed');
                toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            } else {
                historyContent.classList.add('collapsed');
                toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
            }
        }
    }

    // Donation and Limits
    showDonationPopup() {
        const popup = document.getElementById('donationPopup');
        if (popup) {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    continueTrial() {
        this.donationSkipped = true;
        this.closePopup(document.getElementById('donationPopup'));
        this.showMessage('Thank you! You can continue using the trial.', 'success');
    }

    // Utility Functions
    updatePromptCounter() {
        const counter = document.getElementById('promptCount');
        if (counter) {
            counter.textContent = this.promptCount;
        }
    }

    // Accessibility and keyboard navigation
    handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            const activePopup = document.querySelector('.popup-overlay.active');
            if (activePopup) {
                this.closePopup(activePopup);
            }
        }
    }

    // Window resize handler
    handleResize() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
        }
    }

    // AI Integration with Node.js backend
    async enhancePromptWithAI(originalPrompt) {
        try {
            const response = await fetch('/api/enhance-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: originalPrompt,
                    options: {
                        scenario: this.selectedOptions.scenario,
                        tone: this.selectedOptions.tone,
                        length: this.selectedOptions.length,
                        toggles: this.selectedOptions.toggles
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                return data.enhancedPrompt;
            } else {
                throw new Error(data.error || 'Failed to enhance prompt');
            }
        } catch (error) {
            console.error('AI enhancement failed:', error);
            throw error;
        }
    }

    buildEnhancementInstruction(prompt) {
        let instruction = `Please enhance and optimize the following prompt for better AI responses. Apply these improvements:

1. **Clarity Improvement**: Make the prompt clearer and more specific
2. **Grammar and Spelling Check**: Correct any grammatical or spelling errors
3. **SEO Optimization**: Make it search-engine friendly if applicable
4. **Readability Enhancement**: Improve structure and flow
5. **Structured Formatting**: Format for better AI interpretation

Original prompt: "${prompt}"

`;

        // Add selected options
        if (this.selectedOptions.scenario) {
            instruction += `Context: ${this.scenarioMappings[this.selectedOptions.scenario]}\n`;
        }
        
        if (this.selectedOptions.tone) {
            instruction += `Tone: ${this.toneMappings[this.selectedOptions.tone]}\n`;
        }
        
        instruction += `Length: ${this.lengthMappings[this.selectedOptions.length]}\n`;
        
        // Add toggles
        const activeToggles = [];
        if (this.selectedOptions.toggles.sources) activeToggles.push('Include sources and references');
        if (this.selectedOptions.toggles.stepbystep) activeToggles.push('Provide step-by-step instructions');
        if (this.selectedOptions.toggles.seo) activeToggles.push('Make it SEO-friendly');
        if (this.selectedOptions.toggles.examples) activeToggles.push('Include practical examples');
        
        if (activeToggles.length > 0) {
            instruction += `Additional requirements: ${activeToggles.join(', ')}\n`;
        }
        
        instruction += `\nPlease provide ONLY the enhanced prompt as the response, without explanations or additional text.`;
        
        return instruction;
    }

    // Loading Animation
    showLoadingAnimation() {
        const chatMessages = document.getElementById('chatMessages');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-animation';
        loadingDiv.id = 'loadingAnimation';
        
        const steps = [
            { icon: 'fas fa-spell-check', text: 'Checking grammar...' },
            { icon: 'fas fa-magic', text: 'Enhancing text...' },
            { icon: 'fas fa-sort-alpha-down', text: 'Aligning text order...' },
            { icon: 'fas fa-search', text: 'Optimizing for SEO...' },
            { icon: 'fas fa-check-circle', text: 'Finalizing response...' }
        ];
        
        loadingDiv.innerHTML = `
            <div class="loading-container">
                <div class="loading-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="loading-content">
                    <div class="loading-steps">
                        ${steps.map((step, index) => `
                            <div class="loading-step" data-step="${index}">
                                <i class="${step.icon}"></i>
                                <span>${step.text}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="loading-progress">
                        <div class="progress-bar"></div>
                    </div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate steps
        this.animateLoadingSteps(steps.length);
    }

    animateLoadingSteps(totalSteps) {
        let currentStep = 0;
        const stepDuration = 800; // ms per step
        
        const animateStep = () => {
            const steps = document.querySelectorAll('.loading-step');
            const progressBar = document.querySelector('.progress-bar');
            
            if (currentStep < totalSteps) {
                // Activate current step
                steps[currentStep]?.classList.add('active');
                
                // Update progress
                const progress = ((currentStep + 1) / totalSteps) * 100;
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
                
                currentStep++;
                setTimeout(animateStep, stepDuration);
            }
        };
        
        setTimeout(animateStep, 200);
    }

    hideLoadingAnimation() {
        const loadingDiv = document.getElementById('loadingAnimation');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }
}

// Global functions for HTML onclick handlers
function showPromptInterface() {
    if (window.promptHub) {
        window.promptHub.showPromptInterface();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.promptHub = new PromptHub();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (window.promptHub) {
            window.promptHub.handleKeyboardNavigation(e);
        }
    });
    
    // Add window resize handler
    window.addEventListener('resize', () => {
        if (window.promptHub) {
            window.promptHub.handleResize();
        }
    });
    
    // Add loading animation removal
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => el.classList.remove('loading'));
    }, 1000);
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptHub;
}
