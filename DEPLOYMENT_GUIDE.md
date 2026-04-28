# Vercel Deployment Guide - AI Toolkit

Complete guide for deploying the AI Toolkit including the Playground, Gateway, Model Catalog, and Documentation with a single command.

## Prerequisites

- Node.js 18+ installed
- Vercel CLI (`npm i -g vercel`)
- Git repository initialized
- Environment variables configured

## Quick Start - Single Command Deployment

### Option 1: Deploy Everything with Vercel CLI

```bash
# From project root
vercel

# Follow the prompts to:
# 1. Link to a Vercel project (or create new)
# 2. Choose production or preview deployment
# 3. Set environment variables if needed
```

### Option 2: Deploy with Custom Configuration

```bash
# Deploy with project name and production
vercel --prod --confirm

# Deploy to preview
vercel

# Check deployment status
vercel list
```

## Project Structure

```
ai-toolkit/
├── examples/
│   ├── playground/          # Interactive AI Playground
│   │   ├── app/
│   │   ├── components/
│   │   ├── public/
│   │   └── package.json
│   ├── model-catalog/       # Model Discovery Interface
│   │   ├── app/
│   │   └── package.json
│   └── docs/                # API Documentation
│       ├── pages/
│       └── package.json
├── packages/                # Core packages
│   └── ...
└── vercel.json             # Vercel configuration
```

## Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "OPENAI_API_KEY": {
      "description": "OpenAI API Key for playground"
    },
    "ANTHROPIC_API_KEY": {
      "description": "Anthropic API Key"
    }
  },
  "routes": [
    {
      "src": "/playground/(.*)",
      "destination": "/examples/playground/$1"
    },
    {
      "src": "/models/(.*)",
      "destination": "/examples/model-catalog/$1"
    },
    {
      "src": "/docs/(.*)",
      "destination": "/examples/docs/$1"
    }
  ]
}
```

## Environment Variables Setup

### Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

```
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

### Via CLI

```bash
# Set production environment variable
vercel env add OPENAI_API_KEY

# Set preview environment variable
vercel env add --environment=preview OPENAI_API_KEY

# List all environment variables
vercel env ls
```

### Via `.env.local` (Development Only)

Create `.env.local` in project root:

```env
OPENAI_API_KEY=sk_test_...
ANTHROPIC_API_KEY=claude_test_...
# ... other keys
```

## Deployment Steps

### 1. Prepare Your Repository

```bash
# Clone or navigate to repository
git clone https://github.com/khulnasoft/ai-toolkit.git
cd ai-toolkit

# Install dependencies
npm install

# Test build locally
npm run build

# Test dev server
npm run dev
```

### 2. Link to Vercel Project

```bash
# Interactive setup
vercel

# Or link existing project
vercel link --project=your-project-name

# Or force new project
vercel --force
```

### 3. Configure Environment

```bash
# Add environment variables
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
# ... add remaining keys

# Verify environment variables
vercel env ls
```

### 4. Deploy to Production

```bash
# Single command deployment
vercel --prod

# Or with confirmation
vercel --prod --confirm

# Check deployment progress
vercel logs

# View deployment details
vercel inspect
```

### 5. Verify Deployment

```bash
# Get deployment URL
vercel --prod list

# Test deployed site
curl https://your-deployment.vercel.app
```

## Deployment URLs Structure

After deployment, your services will be available at:

```
Main Domain (Vercel auto-assigned):
https://ai-toolkit-playground.vercel.app/

Service Routes:
- Playground: https://ai-toolkit-playground.vercel.app/examples/playground
- Model Catalog: https://ai-toolkit-playground.vercel.app/examples/model-catalog
- Documentation: https://ai-toolkit-playground.vercel.app/examples/docs

or with custom domain:
https://your-domain.com/playground
https://your-domain.com/models
https://your-domain.com/docs
```

## Custom Domain Setup

### 1. Add Domain in Vercel Dashboard

```
Settings → Domains → Add

1. Enter your domain (e.g., ai-toolkit.example.com)
2. Vercel provides DNS records to add
3. Update DNS records at your registrar
4. Verify domain (takes 5-10 minutes)
```

### 2. Set Root Domain

```
Settings → Domains → Staging

Select domain to use for preview deployments
```

## Advanced Deployment Options

### Monorepo Configuration

For monorepo setups with multiple apps:

```bash
# Deploy specific workspace
vercel --prod --scope=workspace-name

# Deploy with custom root
vercel --prod --cwd=examples/playground
```

### Preview Deployments

```bash
# Deploy from branch (automatic with GitHub)
vercel

# Deploy specific branch
vercel --scope=your-team-slug

# Get preview URL
vercel --prod list
```

### Continuous Deployment

#### GitHub Integration (Automatic)

1. Connect GitHub repository in Vercel Dashboard
2. Every push to main → Production deployment
3. Every pull request → Preview deployment

#### CI/CD with GitHub Actions

```yaml
# .github/workflows/vercel-deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, canary]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Pull Vercel environment
        run: vercel env pull --yes --environment=preview
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      
      - name: Build project
        run: vercel build --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run analyze

# Production build
npm run build -- --profile

# Check performance metrics
vercel analytics
```

### Caching Strategy

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=60, s-maxage=300"
        }
      ]
    }
  ]
}
```

## Monitoring & Analytics

### Vercel Analytics Dashboard

1. **Settings** → **Analytics**
2. View real-time metrics:
   - Page load times
   - Core Web Vitals
   - Traffic patterns
   - Error rates

### Logging

```bash
# View deployment logs
vercel logs [deployment-url]

# Real-time logs
vercel logs [deployment-url] --follow

# Filter by status
vercel logs [deployment-url] --status=error
```

## Troubleshooting

### Deployment Fails

```bash
# Clear cache and rebuild
vercel env pull --yes
vercel build --force

# Check logs
vercel logs [deployment-url] --error

# Rebuild from clean state
vercel --prod --force
```

### Environment Variables Not Loading

```bash
# Verify variables are set
vercel env ls

# Pull latest environment
vercel env pull --yes

# Check .env.production
cat .env.production
```

### Build Timeout

```bash
# Increase timeout in vercel.json
{
  "buildCommand": "npm run build",
  "buildTimeout": 300  // 5 minutes
}
```

## Rollback & Versions

```bash
# View deployment history
vercel list

# View specific deployment
vercel inspect [deployment-url]

# Rollback to previous version
vercel rollback

# Promote preview to production
vercel promote [preview-url]
```

## Costs & Billing

- **Free Plan**: 1 deployment/month, limited
- **Pro Plan**: $20/month, unlimited deployments
- **Enterprise**: Custom pricing

For AI Toolkit with multiple providers, Pro plan recommended.

## Security Best Practices

1. **Never commit `.env` files**
   ```bash
   echo ".env.local" >> .gitignore
   echo ".env.*.local" >> .gitignore
   ```

2. **Use Vercel Secrets Manager**
   ```bash
   vercel secrets add OPENAI_API_KEY sk_...
   ```

3. **Enable Protected Branches**
   - Settings → Git Configuration
   - Enable branch protection

4. **Rotate API Keys Regularly**
   - Regenerate keys monthly
   - Update in Vercel dashboard

## Quick Reference Commands

```bash
# Deploy
vercel --prod                    # Production
vercel                          # Preview

# Environment
vercel env add KEY              # Add variable
vercel env ls                   # List variables
vercel env pull                 # Sync environment

# Monitoring
vercel logs [url]               # View logs
vercel inspect [url]            # Inspect deployment
vercel list                      # List all deployments

# Management
vercel remove [url]             # Delete deployment
vercel promote [preview]        # Promote to production
vercel alias [url] [domain]     # Add domain
```

## Support & Resources

- **Documentation**: https://vercel.com/docs
- **CLI Reference**: https://vercel.com/cli
- **Status Page**: https://www.vercelstatus.com/
- **Community**: https://github.com/vercel/community

---

**Last Updated**: 2026
**Status**: Production Ready ✨

For additional help, visit https://vercel.com/help
