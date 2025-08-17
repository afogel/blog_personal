# Ariel Fogel's Personal Blog

A modern personal blog built with Astro v5, featuring AI security research, web development insights, and technical content.

**Live Site:** [fogel.dev](https://fogel.dev)

## Tech Stack

- **Framework:** Astro v5 with view transitions
- **Styling:** Tailwind CSS with responsive design
- **Content:** MDX for rich blog posts
- **Deployment:** Vercel serverless
- **Package Manager:** Bun

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
├── assets/          # Static assets (images, styles)
├── components/      # Reusable Astro components
│   ├── blog/        # Blog-specific components
│   ├── common/      # Shared components
│   ├── ui/          # UI primitives
│   └── widgets/     # Page sections
├── content/         # Blog posts and content
│   └── post/        # MDX blog posts
├── layouts/         # Page layouts
├── pages/           # File-based routing
│   ├── [...blog]/   # Dynamic blog routes
│   └── index.astro  # Homepage with resume
├── utils/           # Utility functions
├── config.yaml      # Site configuration
└── navigation.js    # Navigation structure
```

## Content Management

### Adding Blog Posts

Create new MDX files in `src/content/post/`:

```markdown
---
title: 'Your Post Title'
publishDate: 2024-01-01
category: Security
tags:
  - AI Security
  - Research
---

Your content here...
```

### Updating Experience

Edit `src/pages/index.astro` to update the resume section with new experience or achievements.

## Features

- View Transitions - Smooth navigation between pages
- Dark/Light Mode - Automatic theme switching
- Mobile Responsive - Code blocks wrap on mobile
- SEO Optimized - Open Graph and meta tags
- RSS Feed - Auto-generated at `/rss.xml`
- Tag/Category Pages - Organized content discovery

## Configuration

Key configuration files:

- `src/config.yaml` - Site metadata, social links, blog settings
- `src/navigation.js` - Header navigation and dropdowns
- `astro.config.mjs` - Astro and integration settings

## Development Commands

| Command | Action |
|---------|--------|
| `bun run dev` | Start dev server |
| `bun run build` | Build production site |
| `bun run preview` | Preview build locally |
| `bun run format` | Format code with Prettier |
| `bun run lint:eslint` | Run ESLint |

## Content Categories

- **AI Security** - Research on LLM vulnerabilities and defenses
- **Web Development** - Technical tutorials and insights
- **Learning** - Educational content and methodologies

## Deployment

Automatically deployed to Vercel on push to main branch. The site uses:

- Vercel serverless functions
- Astro's sharp image optimization
- Automatic preview deployments for PRs

## Recent Updates

- Upgraded to Astro v5 with view transitions
- Added AI Security to blog navigation
- Improved code block wrapping for mobile
- Updated Pillar Security experience section
- Cleaned up unused template files and dead code

## License

MIT License - feel free to use this as a template for your own blog.