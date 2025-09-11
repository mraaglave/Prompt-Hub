<div align="center">

# ✨ Prompt Hub

### From a weekend “vibe coding” experiment to a powerful AI productivity tool!

![License](https://img.shields.io/github/license/mraaglave/Prompt-Hub?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/mraaglave/Prompt-Hub?style=for-the-badge)
![Forks](https://img.shields.io/github/forks/mraaglave/Prompt-Hub?style=for-the-badge)

</div>

**[🚀 Live Demo](https://prompt-hub-bl62.onrender.com/) | [🎬 Demo Video](https://youtu.be/6TA8ygwfm8M)**

Have you ever felt like your AI isn't giving you the output you really need? You know your idea is solid, but the response falls flat. That’s exactly the challenge **Prompt Enhancer** is designed to solve.

It's a lightweight, interactive platform that helps you craft smarter, more effective prompts for any major AI model. By offering advanced scenario, tone, and length options in an easy-to-use chat interface, the tool makes AI answers more relevant, faster, and audience-focused without requiring complex technical knowledge. It’s not “just another chatbot”—it’s a productivity booster for developers, marketers, creators, and anyone working with AI.

## ✨ Features

- **🤖 Real AI Integration**: Powered by the Google Gemini API for live prompt enhancement.
- **🎨 Advanced Prompt Controls**: Go beyond a single text box. Fine-tune your requests with options for:
  - **Scenario**: Storytelling, Coding, Marketing, Business Plans, and more.
  - **Tone**: Friendly, Expert, Humorous, Analytical, and others.
  - **Length**: Short, Medium, or Long-form outputs.
  - **Quick Toggles**: Add sources, request step-by-step instructions, or optimize for SEO.
- **💎 Professional UI**: A sleek, responsive Glassmorphism interface with a deep black theme.
- **📈 Session Tracking**: A prompt counter and history panel keep track of your work during a session.
- **🚀 Performance**: Smooth loading animations and a snappy, responsive experience.
- **📱 Fully Responsive**: A seamless experience on desktop, tablet, and mobile devices.

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3 (Glassmorphism, Flex/Grid), JavaScript (Vanilla)
- **Storage**: sessionStorage for counter/history (reset on browser close)
- **Icons**: Font Awesome
- **AI**: Google Gemini API
- **Deployment**: Dockerized, live on Render & Vercel

## 🤖 Built With an AI-Powered Dev Workflow

This project started as a weekend experiment and was rapidly developed into a fully functional application by leveraging a suite of AI-powered tools:

- **GitHub Copilot**: For real-time code completion and suggestions.
- **Gemini Extension for VS Code**: For brainstorming, refactoring, and generating code blocks.
- **Warp AI**: For terminal superpowers and command generation.
- **Cursor**: An AI-first code editor for a more integrated development experience.
- **Phind AI**: For quick research, problem-solving, and finding optimal solutions.

- **Fonts**: Google Fonts (Poppins)
- **Payments**: PayPal.me, BuyMeACoffee, Stripe links (trial – no backend verification)
- **Hosting**: GitHub Pages / Vercel compatible

## 🎯 User Flow

1. **Landing Page**: User sees project intro → clicks Get Started
2. **Prompt Interface**: User enters prompt → selects options from + popup (optional) → sends
3. **Response Display**: AI-style output with copy button
4. **Session Tracking**: Prompt counter updates, history stores prompts until browser close
5. **Donation Trigger**: At 5 prompts, a modal popup encourages donations
6. **Continue Use**: User can close popup to keep testing in trial version

## 🎨 Audience-Focused Options

### Scenarios
- Story Writing
- Video Script
- Marketing Copy
- Code Help
- Design Ideas
- Business Plans
- Educational Content
- Creative Projects

### Tones
- Friendly
- Expert
- Humorous
- Creative
- Empathetic
- Analytical

### Quick Toggles
- Add Examples
- SEO Friendly
- Include References
- Step-by-Step Mode

## 🎨 Visual Theme

- **Background**: #0d0d0d (black)
- **Panels**: rgba(255,255,255,0.05) with backdrop-filter: blur(10px)
- **Text**: White with soft shadows for contrast
- **Buttons**: Gradient (#ff7e5f → #feb47b) + glow on hover
- **Glassmorphism**: Full frosted glass effect with proper blur and transparency

## 🚀 Getting Started

## 🚀 Deployment Options

### Render.com (Recommended)
- **Free tier available** with automatic scaling
- **Easy deployment** with Blueprint support
- **Custom domains** supported
- **Docker containerization** for consistency
- **Health checks** and monitoring included

**Quick Deploy:**
1. Fork this repository
2. Go to [Render.com](https://render.com)
3. Use the Blueprint option
4. Connect your repository
5. Set `GEMINI_API_KEY` environment variable
6. Deploy!

**See `RENDER_DEPLOYMENT.md` for detailed instructions.**

### Vercel
- **Serverless deployment** with edge functions
- **Automatic CI/CD** from GitHub
- **Global CDN** for fast performance
- **Free tier** available

**See `VERCEL_DEPLOYMENT.md` for detailed instructions.**

### Local Development
- **Full control** over environment
- **Easy debugging** and development
- **No deployment** required for testing

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- Modern web browser with ES6+ support
- **Gemini API Key** (provided in the project)

### Installation & Setup

#### Method 1: Local Development
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the server:**
   ```bash
   npm start
   ```
3. **Open your browser** to `http://localhost:3000`
4. **Start enhancing prompts!**

#### Method 2: Render.com Deployment (Recommended)
1. **Follow the deployment guide** in `RENDER_DEPLOYMENT.md`
2. **Use the deployment script:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

#### Method 3: Vercel Deployment
1. **Follow the deployment guide** in `VERCEL_DEPLOYMENT.md`
2. **Deploy to Vercel** for production use
3. **Access your app** at your Vercel domain

### File Structure
```
prompt-enhancer/
├── index.html          # Main HTML file with glassmorphism UI
├── css/
│   └── style.css      # Professional black theme + glassmorphism
├── js/
│   └── script.js      # Complete functionality with AI integration
├── assets/            # Additional project assets
├── images/            # Project images and media
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## 💻 Usage

### Basic Usage
1. Click "Get Started" on the home page
2. Enter your prompt in the text area
3. (Optional) Click the "+" button to enhance your prompt with:
   - **Scenario**: Choose context (storytelling, coding, marketing, etc.)
   - **Tone**: Select communication style (friendly, expert, creative, etc.)
   - **Length**: Pick response size (short, medium, long)
   - **Quick Options**: Toggle additional features
4. Click send to process your enhanced prompt
5. Copy the enhanced prompt for use with your preferred AI service

### Advanced Features
- **Session History**: View and reuse previous prompts from the current session
- **Trending Presets**: Quick-start with popular prompt templates
- **Mobile Responsive**: Full functionality on all device sizes
- **Copy to Clipboard**: Easy sharing of enhanced prompts

## 🔧 Customization

### Modifying Scenarios
Edit the `scenarioMappings` object in `js/script.js`:
```javascript
this.scenarioMappings = {
    storytelling: "For creative storytelling purposes",
    coding: "For programming and development",
    // Add your custom scenarios here
};
```

### Changing Tones
Modify the `toneMappings` object:
```javascript
this.toneMappings = {
    friendly: "in a warm, approachable tone",
    expert: "with professional expertise and authority",
    // Add your custom tones here
};
```

### Styling Customization
Edit CSS variables in `css/style.css`:
```css
:root {
    --bg-primary: #0d0d0d;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --gradient-primary: linear-gradient(135deg, #ff7e5f, #feb47b);
    /* Customize these values */
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

Mobile-specific features:
- Collapsible navigation menu
- Touch-friendly buttons
- Optimized popup layouts
- Swipe gestures support

## ✅ Current Implementation Status

### Completed Features
- ✅ **Real AI Integration** - Google Gemini AI API for live prompt enhancement
- ✅ **Professional UI** - Deep black theme with enhanced glassmorphism effects
- ✅ **Loading Animations** - Step-by-step progress indicators during AI processing
- ✅ **Fixed Donation Logic** - Proper session management and skip functionality
- ✅ **Enhanced Copy System** - Perfectly positioned copy buttons with professional styling
- ✅ **Mobile Responsive** - Optimized for all screen sizes
- ✅ **Session Management** - Local storage for prompts and history
- ✅ **Advanced Options** - Scenario, tone, length, and toggle selections
- ✅ **Trending Presets** - Quick-start prompt templates

### AI Enhancement Features
- 🔍 **Grammar & Spelling Check** - Automatic correction of errors
- ✨ **Clarity Improvement** - Makes prompts clearer and more specific
- 🔍 **SEO Optimization** - Search-engine friendly enhancements
- 📖 **Readability Enhancement** - Improved structure and flow
- 🏗️ **Structured Formatting** - Better AI interpretation formatting

### Loading Animation Steps
1. 📝 Checking grammar...
2. ✨ Enhancing text...
3. 🔄 Aligning text order...
4. 🔍 Optimizing for SEO...
5. ✅ Finalizing response...

## 🔮 Future Upgrades

- [ ] Additional AI providers (OpenAI, Claude, etc.)
- [ ] Login & persistent history (Firebase/Supabase)
- [ ] Subscription tiers with extended limits
- [ ] AI analytics for trending topics
- [ ] Team collaboration features
- [ ] Custom prompt templates
- [ ] Export/import functionality
- [ ] Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/prompt-hub/issues)
- **Email**: hello@prompthub.com
- **Documentation**: [GitHub Wiki](https://github.com/your-username/prompt-hub/wiki)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- The glassmorphism design community for inspiration
- Open source contributors

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📊 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## 🔒 Privacy

- No data is sent to external servers in trial mode
- Session data is stored locally and cleared on browser close
- No tracking or analytics in the current version

---

**Made with ❤️ for the AI community**
