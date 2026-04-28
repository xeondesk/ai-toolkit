# AI Toolkit Playground - Modern Interactive Interface

A beautifully designed, fully responsive playground for experimenting with AI models from 10+ providers using the Vercel AI Toolkit.

## ✨ What's New (v2.0)

- 🎨 **Modern Dark-First Design** - Professional dark theme with vibrant accent colors
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🚀 **Enhanced Provider Discovery** - Visual grid with search and quick selection
- 💬 **Improved Chat UI** - Better messaging, copy functionality, loading states
- 🎯 **Better Code Generation** - Enhanced editor with download and status feedback
- ⚡ **Performance Optimized** - Smooth animations, efficient rendering
- ♿ **Accessibility** - WCAG AA compliant, keyboard navigable
- 🌙 **Theme Toggle** - Light/dark mode support

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for detailed changes.

## ✨ Features

### 🚀 Multi-Provider Support (10+ Providers)
- **OpenAI**: GPT-4, GPT-4 Turbo, GPT-3.5-Turbo
- **Anthropic**: Claude 3 Opus, Sonnet, Haiku
- **Google**: Gemini 1.5 Pro, Flash, Pro
- **Groq**: Fast inference with Llama, Mixtral
- **Mistral**: Mistral Large, Medium, Small
- **Cohere**: Command, Command-R, Command-R+
- **Perplexity**: Sonar models
- **xAI**: Grok Beta
- **Fireworks**: Llama, Mixtral, Gemma
- **DeepSeek**: Chat, Coder models

### 💬 Interactive Chat
- Real-time conversation with streaming responses
- Message history with context
- Copy message functionality with confirmation
- Typing indicators and loading states
- Empty states with helpful guidance

### 🎨 Code Generation
- Natural language to code generation
- Multi-language support (TypeScript, JavaScript)
- Copy to clipboard with feedback
- Download generated code
- Real-time generation status
- Character counter

### 🌙 Modern UI/UX
- Dark-first professional theme
- Responsive grid layouts
- Smooth animations and transitions
- Touch-friendly interface
- Sticky headers and sidebar
- Visual feedback on interactions

### 📱 Mobile-First Design
- 48px+ touch targets
- Optimized layouts for small screens
- Horizontal scroll for provider selection
- Collapsible sections
- Full functionality on all devices

### 🎯 Provider Discovery
- Visual grid layout with provider cards
- Search functionality
- Model count display
- Quick model selection badges
- Current provider information

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser: http://localhost:3000
```

### Deploy to Vercel (Single Command)

```bash
# One-command deployment to production
vercel --prod

# Or use interactive mode
vercel

# Preview deployments for testing
vercel  # Creates preview URL
```

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](../../../DEPLOYMENT_GUIDE.md).

## 📋 Environment Variables

### Development (.env.local)
```env
OPENAI_API_KEY=sk_...
ANTHROPIC_API_KEY=claude_...
GROQ_API_KEY=gsk_...
GOOGLE_API_KEY=...
COHERE_API_KEY=...
PERPLEXITY_API_KEY=...
XAI_API_KEY=...
FIREWORKS_API_KEY=...
DEEPSEEK_API_KEY=...
MISTRAL_API_KEY=...
```

### Production (Vercel Dashboard)
1. Settings → Environment Variables
2. Add each API key
3. Deploy — variables auto-injected

## 📚 Usage

### Chat Interface
1. Select provider and model from sidebar
2. Type your message
3. Stream responses in real-time
4. Copy messages with one click

### Code Generation
1. Enter code generation prompt
2. Select target model
3. Generate code
4. Copy or download

### Examples
Pre-built examples for:
- Text generation
- Code generation
- Data analysis
- Creative writing
- Translation

## 🏗️ Architecture

### Components
```
components/
├── header.tsx              # Sticky navigation (NEW)
├── provider-selector.tsx   # Provider/model selection (ENHANCED)
├── provider-card.tsx       # Rich provider display (NEW)
├── model-badge.tsx         # Model chips (NEW)
├── chat-interface.tsx      # Chat UI (ENHANCED)
├── code-editor.tsx         # Code generation (ENHANCED)
├── loading-skeleton.tsx    # Loading states (NEW)
└── ui/                     # Base components
```

### Pages & API
```
app/
├── page.tsx                # Main interface
├── layout.tsx              # Root layout
├── globals.css             # Design tokens
└── api/
    ├── chat/route.ts       # Chat endpoint
    └── generate-code/route.ts
```

## 🎨 Design System

### Colors (Dark Theme)
- **Primary**: `#5B4FFF` - Interactive elements
- **Background**: `#0F0F1E` - Main background
- **Card**: `#16213E` - Component backgrounds
- **Border**: `#2D3561` - Dividers
- **Text Primary**: `#FFFFFF` - Main text
- **Text Secondary**: `#B0B5D3` - Meta text

### Typography
- **Font**: Inter (system-optimized)
- **Spacing**: Tailwind scale (0.25rem-8rem)
- **Animations**: GPU-accelerated transitions

## 📖 File Structure

```
playground/
├── app/
│   ├── page.tsx              # Main interface
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Design system
│   └── api/
├── components/
│   ├── header.tsx            # NEW
│   ├── provider-selector.tsx # ENHANCED
│   ├── provider-card.tsx     # NEW
│   ├── model-badge.tsx       # NEW
│   ├── chat-interface.tsx    # ENHANCED
│   ├── code-editor.tsx       # ENHANCED
│   └── loading-skeleton.tsx  # NEW
├── lib/
│   ├── providers.ts          # Provider definitions
│   └── utils.ts              # Utilities
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind config
├── IMPROVEMENTS.md           # Detailed changes
└── README.md                 # This file
```

## 🔧 Customization

### Change Theme Color
Edit `app/globals.css`:
```css
:root {
  --primary: 270 100% 50%;  /* Your color */
}
```

### Add Provider
Edit `lib/providers.ts` and add new provider entry.

### Modify Layout
Edit `app/page.tsx` for grid, spacing, or component changes.

## 🧪 Testing

- Chrome, Firefox, Safari, Edge ✓
- iPhone, iPad, Android ✓
- All providers and models ✓
- Chat and code generation ✓
- Dark/light mode ✓
- Mobile navigation ✓

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Features
- Automatic deployments on push
- Preview deployments for PRs
- Performance analytics
- Custom domains
- Environment management

### Other Platforms
Works with any Next.js host (Netlify, AWS, Railway, Render, Fly.io).

## 📈 Performance

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Optimizations
- CSS animations only (GPU)
- Lazy loading
- Font optimization
- Code splitting
- Minified assets

## 🔐 Security

- ✅ No frontend API key exposure
- ✅ Server-side API handling
- ✅ Environment variable protection
- ✅ HTTPS on Vercel
- ✅ CORS configured
- ✅ Input sanitization

## 🆘 Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build errors
```bash
npm run build --verbose
```

### API errors
- Check `.env.local` for API keys
- Verify keys are valid
- Check browser console
- Review terminal logs

### Styling issues
```bash
npm run dev
```

## 📚 Resources

- [Vercel AI SDK](https://sdk.vercel.ai)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Deployment Guide](../../../DEPLOYMENT_GUIDE.md)
- [Improvements Doc](./IMPROVEMENTS.md)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

Apache License - see LICENSE file

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Status**: Production Ready ✨  
**Version**: 2.0.0  
**Last Updated**: 2026

**Deploy Now**: `vercel --prod`
