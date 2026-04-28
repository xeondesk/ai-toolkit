# AI Toolkit - Quick Start Guide

Get up and running with the modernized AI Toolkit Playground in minutes.

## 🚀 Development (5 minutes)

### 1. Install & Setup
```bash
# Navigate to playground
cd examples/playground

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# (Add your API keys if needed)
```

### 2. Run Dev Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Test Features
- ✅ Select a provider (OpenAI, Anthropic, etc.)
- ✅ Choose a model
- ✅ Try chat interface
- ✅ Test code generation
- ✅ Explore examples

## 🌐 Deploy to Vercel (2 minutes)

### Option 1: Simplest (Recommended)
```bash
# From project root
vercel --prod
```

That's it! Vercel will:
1. Detect Next.js app automatically
2. Build and deploy in seconds
3. Give you a production URL
4. Set up automatic deploys on git push

### Option 2: With Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository
4. Click Deploy
5. Add environment variables if needed

### Option 3: Step by Step
```bash
# First time only
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 🔧 Configuration

### Add API Keys (Production)

**Via Vercel Dashboard:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add keys for each provider

**Via Vercel CLI:**
```bash
vercel env add OPENAI_API_KEY sk_...
vercel env add ANTHROPIC_API_KEY claude_...
```

## 📚 What Was Improved

### UI/Design
- ✨ Dark-first professional theme
- 📱 Fully responsive design
- 🎨 Vibrant accent colors
- ⚡ Smooth animations

### Features
- 🎯 Visual provider grid with search
- 💬 Enhanced chat with copy button
- 🎨 Better code editor
- 🌙 Dark/light mode toggle

### Deployment
- 🚀 Single-command deployment
- 📊 Automatic performance analytics
- 🔄 Preview deployments for PRs
- 🌍 Custom domain support

## 📂 File Organization

```
ai-toolkit/
├── examples/
│   └── playground/          ← Your playground
│       ├── app/
│       ├── components/      ← Improved components
│       ├── public/
│       ├── package.json
│       ├── README.md        ← Updated docs
│       └── IMPROVEMENTS.md  ← Detailed changes
├── DEPLOYMENT_GUIDE.md      ← Full guide
├── PLAYGROUND_IMPROVEMENTS_SUMMARY.md
└── QUICK_START.md           ← You are here
```

## 🆘 Common Issues

### Dev server won't start
```bash
npm install
npm run dev
```

### API calls failing
- Check `.env.local` has API keys
- Verify keys are valid
- Check browser console for errors

### Deployment fails
```bash
# Clean rebuild
npm run build

# Then deploy
vercel --prod
```

## 🎯 Next Steps

1. **Try the playground**: Visit http://localhost:3000
2. **Deploy it**: `vercel --prod`
3. **Customize it**: Edit colors, add providers
4. **Share it**: Share your deployment URL

## 📖 Full Documentation

- **Detailed improvements**: See `examples/playground/IMPROVEMENTS.md`
- **Deployment guide**: See `DEPLOYMENT_GUIDE.md`
- **Playground README**: See `examples/playground/README.md`

## 🎨 Customization Examples

### Change Primary Color
Edit `examples/playground/app/globals.css`:
```css
:root {
  --primary: 200 100% 50%;  /* Change to blue */
}
```

### Add New Provider
Edit `examples/playground/lib/providers.ts`:
```typescript
{
  id: 'new-provider',
  name: 'New Provider',
  models: ['model-1', 'model-2'],
  createModel: (m) => newProvider(m),
}
```

### Adjust Layout
Edit `examples/playground/app/page.tsx` - change grid columns or spacing.

## 🚀 Deploy Examples

### Deploy to production
```bash
vercel --prod
```

### Deploy with custom name
```bash
vercel --prod --name my-ai-playground
```

### Preview before production
```bash
vercel  # Creates preview URL
# Test it
vercel --prod  # Deploy to production
```

## 📊 URLs After Deployment

- **Main**: `https://your-deployment.vercel.app`
- **Playground**: `https://your-deployment.vercel.app/examples/playground`
- **API**: `https://your-deployment.vercel.app/api/chat`

## 🎯 Key Features to Try

### Provider Selection
- Click on provider cards to select
- Search for providers
- See available models

### Chat
- Type a message
- Get AI response in real-time
- Copy responses with button
- Clear conversation

### Code Generation
- Enter code prompt
- Get generated code
- Copy or download
- Try different providers

## 💡 Pro Tips

1. **Fast switching**: Use provider cards instead of dropdowns
2. **Model comparison**: Try same prompt on different providers
3. **Copy messages**: Hover over assistant messages for copy button
4. **Keyboard enter**: Press Enter to generate code
5. **Mobile friendly**: Works perfectly on phone/tablet

## 🔗 Resources

- **AI SDK Docs**: https://sdk.vercel.ai
- **Next.js Docs**: https://nextjs.org
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Install & setup | 2 min |
| Run locally | 1 min |
| Test features | 3 min |
| Deploy to Vercel | 2 min |
| **Total** | **8 minutes** |

## ✅ Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Run dev server (`npm run dev`)
- [ ] Test chat interface
- [ ] Test code generation
- [ ] Deploy to Vercel (`vercel --prod`)
- [ ] Share your URL

## 🎉 Done!

You now have a production-ready AI playground with:
- ✨ Modern design
- 📱 Mobile responsive
- 🚀 Deployed on Vercel
- 🌍 Live on the internet

## 🆘 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed deployment help
2. See `IMPROVEMENTS.md` for what changed
3. Read `README.md` for full documentation
4. Visit https://vercel.com/help for Vercel support

---

**Ready? Let's go!** 🚀

```bash
cd examples/playground
npm install
npm run dev
```

Then deploy:
```bash
vercel --prod
```

**Share your live playground!** 🎊
