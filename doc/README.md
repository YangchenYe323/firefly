# Firefly - VTuber Song Website Documentation

## Overview

Firefly is a personal website for VTuber 蝶蝶Hikari (Hikari) to display and manage her song collection. The website allows fans to browse, search, and interact with her songs, while providing an admin interface for content management.

**Live Site**: https://www.diehikari.top/

## Project Structure

```
firefly/
├── doc/                    # Documentation files
│   ├── README.md          # This file
│   ├── architecture.md    # System architecture overview
│   ├── database.md        # Database schema and design
│   ├── frontend.md        # Frontend components and structure
│   ├── backend.md         # Backend API and server actions
│   ├── admin.md           # Admin interface documentation
│   ├── player.md          # Audio player implementation
│   └── deployment.md      # Deployment and configuration
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Shared UI components
│   ├── lib/             # Utility libraries
│   └── generated/       # Prisma generated types
├── prisma/              # Database schema and migrations
├── public/              # Static assets
└── scripts/             # Utility scripts
```

## Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: PostgreSQL (Neon), Prisma ORM
- **Authentication**: JWT with bcrypt
- **Audio**: Custom HTML5 audio player
- **Deployment**: Vercel (assumed)

## Key Features

- 🎵 Song browsing and search with filtering
- 🎧 Built-in audio player with playlist support
- 👍 Like/dislike reactions on songs
- 🔍 Advanced search with tags and language filters
- 🎲 Random song selection
- 📱 Responsive design
- 🔐 Admin interface for content management
- 🌐 Bilibili integration for video metadata

## Quick Start

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables (see `.env.example`)
4. Configure database: `pnpm prisma db push`
5. Start development server: `pnpm dev`

## Documentation Index

- [Architecture Overview](./architecture.md) - System design and component relationships
- [Database Design](./database.md) - Schema, models, and data relationships
- [Frontend Components](./frontend.md) - UI components and page structure
- [Backend API](./backend.md) - Server actions and API endpoints
- [Admin Interface](./admin.md) - Content management system
- [Audio Player](./player.md) - Custom audio player implementation
- [Deployment Guide](./deployment.md) - Production deployment and configuration

## Contributing

This project is specifically designed for 蝶蝶Hikari's song collection. For questions or issues, please contact the maintainers.

## License

Private project for 蝶蝶Hikari's personal use. 