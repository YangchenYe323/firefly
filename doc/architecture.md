# System Architecture

## Overview

Firefly follows a modern full-stack architecture using Next.js 14 with the App Router pattern. The system is designed as a single-page application with server-side rendering capabilities, featuring a custom audio player and admin interface.

## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │    │   (Server       │    │   (PostgreSQL)  │
│                 │    │    Actions)     │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Root.tsx      │◄──►│ • crud.ts       │◄──►│ • Song          │
│ • SongPanel     │    │ • reaction.ts   │    │ • User          │
│ • SongPlayer    │    │ • userLogin.ts  │    │ • Feedback      │
│ • Admin UI      │    │ • auth.ts       │    │ • Footer        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   External      │    │   Generated     │
│   Utilities     │    │   Services      │    │   Types         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • utils.ts      │    │ • Bilibili API  │    │ • Prisma Client │
│ • pubsub.ts     │    │ • Audio Files   │    │ • JSON Types    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Components

### 1. Frontend Layer (Next.js App Router)

**Entry Points:**
- `src/app/page.tsx` - Main landing page
- `src/app/layout.tsx` - Root layout with global styles
- `src/app/admin/page.tsx` - Admin interface

**Key Components:**
- `Root.tsx` - Main application wrapper
- `SongPanel.tsx` - Song display and interaction
- `SongPlayer.tsx` - Audio player interface
- `EditableSongTable.tsx` - Admin song management

**Frontend Utilities:**
- `utils.ts` - Client-side utility functions (shuffle, copy to clipboard)
- `pubsub.ts` - Frontend event system for component communication

### 2. Backend Layer (Server Actions)

**Data Operations:**
- `crud.ts` - Song CRUD operations
- `reaction.ts` - Like/dislike functionality
- `userLogin.ts` - Authentication

**External Integrations:**
- `bilibili.ts` - Bilibili API integration for video metadata
- `auth.ts` - JWT authentication

**External Services:**
- **Bilibili API** - Fetches video metadata when songs are updated
- **Audio Files** - External audio file hosting for song playback

### 3. Database Layer (Prisma + PostgreSQL)

**Models:**
- `Song` - Core song data with JSON metadata
- `User` - Admin user accounts
- `Feedback` - User feedback system
- `Footer` - Dynamic footer content

### 4. Audio System

**Custom Player:**
- `player.ts` - Audio player state management
- `audio.ts` - HTML5 audio wrapper
- `hooks.ts` - React hooks for player integration

## Data Flow

### 1. Song Display Flow

```
User Request → page.tsx → readSongAllNoCacheLatest() → Prisma → Database
                ↓
            Root.tsx → SongPanel → SongTableRow (for each song)
```

### 2. Audio Player Flow

```
Song Selection → SongPlayer → player.ts → audio.ts → HTML5 Audio API
                    ↓
                State Management → UI Updates
```

### 3. Admin Operations Flow

```
Admin Login → JWT Verification → Admin UI → Server Actions → Database
                    ↓
            Real-time UI Updates
```

### 4. Reaction System Flow

```
User Reaction → reaction.ts → Raw SQL Update → Database
                    ↓
                UI State Update
```

### 5. External Service Integration Flow

```
Song Update → Backend → Bilibili API → Video Metadata → Database
                    ↓
            Audio File URL → External Storage → Player Access
```

## State Management

### 1. Server State (Database)
- Songs, users, feedback stored in PostgreSQL
- JSON fields for flexible metadata storage
- Real-time updates through server actions

### 2. Client State (React)
- Audio player state managed by custom player
- UI state managed by React hooks
- Form state managed by controlled components

### 3. Global State
- JWT authentication tokens
- Audio player singleton instance
- PubSub system for cross-component communication

## Security Architecture

### 1. Authentication
- JWT-based authentication for admin access
- bcrypt password hashing
- Secure cookie storage

### 2. Authorization
- Server-side action validation
- Admin-only routes protection
- Input sanitization and validation

### 3. Data Protection
- SQL injection prevention through Prisma
- XSS protection through React
- CSRF protection through Next.js

## Performance Considerations

### 1. Caching Strategy
- Static page generation for public content
- Client-side caching for audio files
- Database query optimization

### 2. Bundle Optimization
- Dynamic imports for heavy components
- Tree shaking for unused code
- Image optimization with Next.js

### 3. Audio Performance
- Lazy loading of audio files
- Streaming audio playback
- Memory management for audio instances

## Scalability Design

### 1. Database Scaling
- Connection pooling with Prisma
- Efficient indexing on frequently queried fields
- JSON field optimization for metadata

### 2. Application Scaling
- Stateless server actions
- CDN for static assets
- Horizontal scaling capability

### 3. Audio Scaling
- External audio file hosting
- Progressive audio loading
- Bandwidth optimization

## Error Handling

### 1. Client-Side Errors
- React error boundaries
- Graceful degradation for audio failures
- User-friendly error messages

### 2. Server-Side Errors
- Structured error responses
- Logging and monitoring
- Fallback mechanisms

### 3. Database Errors
- Connection retry logic
- Transaction rollback
- Data validation errors

## Monitoring and Observability

### 1. Application Metrics
- Page load performance
- Audio playback metrics
- User interaction tracking

### 2. Error Tracking
- Client-side error reporting
- Server-side error logging
- Database performance monitoring

### 3. User Analytics
- Song interaction patterns
- Player usage statistics
- Admin activity monitoring 