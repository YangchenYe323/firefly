# Deployment Guide

## Overview

This guide covers the deployment process for Firefly, including environment setup, database configuration, build optimization, and production deployment to Vercel.

## Prerequisites

### 1. Required Accounts

- **Vercel Account** - For hosting and deployment
- **Neon Database** - PostgreSQL database service
- **GitHub Account** - For source code repository
- **Domain Provider** - For custom domain (optional)

### 2. Development Environment

```bash
# Required software
Node.js >= 18.0.0
pnpm >= 8.0.0
Git >= 2.30.0

# Verify installations
node --version
pnpm --version
git --version
```

## Environment Configuration

### 1. Environment Variables

**Local Development (`.env.local`):**
```env
# Database
POSTGRES_PRISMA_URL="postgresql://user:password@host:port/database"

# Authentication
NEXT_PUBLIC_JWT_SECRET_KEY="your-secret-key-here"

# Optional
NODE_ENV="development"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Production (Vercel Environment Variables):**
```env
# Database (Neon connection string)
POSTGRES_PRISMA_URL="postgresql://user:password@host:port/database?sslmode=require"

# Authentication (use strong secret)
NEXT_PUBLIC_JWT_SECRET_KEY="your-production-secret-key"

# Environment
NODE_ENV="production"
NEXT_PUBLIC_SITE_URL="https://www.diehikari.top"
```

### 2. Database Setup

#### Neon Database Configuration

1. **Create Neon Project:**
   - Sign up at [neon.tech](https://neon.tech)
   - Create new project
   - Note the connection string

2. **Configure Connection Pooling:**
   ```env
   # Use pooled connection for production
   POSTGRES_PRISMA_URL="postgresql://user:password@pool.host:port/database?sslmode=require"
   ```

3. **Database Migration:**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Push schema to database
   pnpm prisma db push
   
   # Optional: Run migrations
   pnpm prisma migrate deploy
   ```

### 3. Security Configuration

#### JWT Secret Generation

```bash
# Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Environment Variable Security

- Use different secrets for development and production
- Never commit secrets to version control
- Use Vercel's environment variable encryption
- Rotate secrets regularly

## Build and Deployment

### 1. Local Build Testing

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma generate

# Build application
pnpm build

# Test production build locally
pnpm start
```

### 2. Vercel Deployment

#### Automatic Deployment (Recommended)

1. **Connect Repository:**
   - Push code to GitHub
   - Connect repository in Vercel dashboard
   - Configure build settings

2. **Build Configuration (`vercel.json`):**
   ```json
   {
     "buildCommand": "pnpm build",
     "outputDirectory": ".next",
     "installCommand": "pnpm install",
     "framework": "nextjs"
   }
   ```

3. **Environment Variables:**
   - Set in Vercel dashboard
   - Use production values
   - Enable encryption for sensitive data

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Domain Configuration

#### Custom Domain Setup

1. **Add Domain in Vercel:**
   - Go to project settings
   - Add custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.19
   ```

3. **SSL Certificate:**
   - Vercel automatically provisions SSL
   - Force HTTPS redirect in settings

## Production Optimization

### 1. Build Optimization

#### Next.js Configuration (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle analyzer (optional)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
      return config;
    },
  }),
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

#### Bundle Analysis

```bash
# Analyze bundle size
ANALYZE=true pnpm build
```

### 2. Performance Optimization

#### Caching Strategy

```typescript
// Static page generation
export async function generateStaticParams() {
  // Generate static pages for songs
  const songs = await prisma.song.findMany();
  return songs.map((song) => ({
    id: song.id.toString(),
  }));
}

// Cache control headers
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    other: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  };
}
```

#### Image Optimization

```typescript
// Next.js Image component with optimization
import Image from 'next/image';

<Image
  src={profile.avatarImagePath}
  alt="Avatar"
  width={40}
  height={40}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 3. Monitoring and Analytics

#### Vercel Analytics

```typescript
// Enable Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Error Monitoring

```typescript
// Error boundary for production
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## Security Configuration

### 1. Security Headers

```typescript
// Security headers in next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ];
}
```

### 2. Content Security Policy

```typescript
// CSP configuration
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' vercel.live;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

// Add to headers
{
  key: 'Content-Security-Policy',
  value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
}
```

### 3. Database Security

```sql
-- Create read-only user for public queries
CREATE USER readonly_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE your_database TO readonly_user;
GRANT USAGE ON SCHEMA public TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;
```

## Backup and Recovery

### 1. Database Backup

#### Automated Backups

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
gzip backup_$DATE.sql

# Upload to cloud storage
aws s3 cp backup_$DATE.sql.gz s3://your-backup-bucket/
```

#### Manual Backup

```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Import database
psql $DATABASE_URL < backup.sql
```

### 2. File Backup

```bash
# Backup uploaded files
rsync -avz /path/to/uploads/ backup-server:/backups/uploads/

# Backup configuration files
tar -czf config_backup_$(date +%Y%m%d).tar.gz .env* next.config.js
```

### 3. Recovery Procedures

```bash
# Database recovery
psql $DATABASE_URL < backup.sql

# Application rollback
vercel rollback

# Environment variable recovery
# Restore from Vercel dashboard or backup
```

## Maintenance

### 1. Regular Maintenance Tasks

#### Database Maintenance

```sql
-- Analyze tables for query optimization
ANALYZE;

-- Vacuum tables to reclaim space
VACUUM ANALYZE;

-- Check for long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
FROM pg_stat_activity 
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';
```

#### Application Maintenance

```bash
# Update dependencies
pnpm update

# Check for security vulnerabilities
pnpm audit

# Run tests
pnpm test

# Update Prisma schema
pnpm prisma generate
pnpm prisma db push
```

### 2. Monitoring

#### Health Checks

```typescript
// Health check endpoint
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check external services
    const response = await fetch('https://api.bilibili.com/x/web-interface/view?bvid=BV1xx411c7mu');
    
    return Response.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      external_services: 'operational'
    });
  } catch (error) {
    return Response.json({ 
      status: 'unhealthy', 
      error: error.message 
    }, { status: 500 });
  }
}
```

#### Performance Monitoring

```typescript
// Performance monitoring
export function middleware(request: NextRequest) {
  const start = Date.now();
  
  const response = NextResponse.next();
  
  const duration = Date.now() - start;
  
  // Log slow requests
  if (duration > 1000) {
    console.warn(`Slow request: ${request.url} took ${duration}ms`);
  }
  
  return response;
}
```

### 3. Troubleshooting

#### Common Issues

**Database Connection Issues:**
```bash
# Check connection
psql $DATABASE_URL -c "SELECT 1;"

# Check connection pool
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"
```

**Build Failures:**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules/.cache

# Reinstall dependencies
pnpm install --force

# Check for TypeScript errors
pnpm tsc --noEmit
```

**Performance Issues:**
```bash
# Analyze bundle
ANALYZE=true pnpm build

# Check memory usage
node --max-old-space-size=4096 node_modules/.bin/next build
```

## Scaling Considerations

### 1. Horizontal Scaling

#### Load Balancing

```typescript
// Stateless application design
// No server-side state storage
// Use external services for state management
```

#### Database Scaling

```sql
-- Read replicas for scaling reads
-- Connection pooling for connection management
-- Query optimization for performance
```

### 2. Caching Strategy

#### Redis Caching

```typescript
// Redis integration for caching
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedSongs() {
  const cached = await redis.get('songs');
  if (cached) {
    return JSON.parse(cached);
  }
  
  const songs = await prisma.song.findMany();
  await redis.setex('songs', 300, JSON.stringify(songs));
  return songs;
}
```

#### CDN Configuration

```typescript
// Static asset optimization
// Use Vercel's edge network
// Configure custom CDN if needed
```

### 3. Cost Optimization

#### Resource Optimization

```typescript
// Optimize bundle size
// Use dynamic imports
// Implement lazy loading
```

#### Database Optimization

```sql
-- Use appropriate indexes
-- Optimize queries
-- Monitor query performance
```

## Compliance and Legal

### 1. Privacy Compliance

#### GDPR Compliance

```typescript
// Privacy policy implementation
// Cookie consent
// Data retention policies
```

#### Data Protection

```typescript
// Encrypt sensitive data
// Implement data anonymization
// Regular security audits
```

### 2. Accessibility

#### WCAG Compliance

```typescript
// Implement accessibility features
// Keyboard navigation
// Screen reader support
// Color contrast compliance
```

### 3. Performance Standards

#### Core Web Vitals

```typescript
// Monitor Core Web Vitals
// Optimize for LCP, FID, CLS
// Implement performance budgets
```

## Support and Documentation

### 1. Documentation

- Keep documentation up to date
- Document deployment procedures
- Maintain troubleshooting guides
- Create runbooks for common issues

### 2. Monitoring and Alerting

```typescript
// Set up monitoring alerts
// Monitor error rates
// Track performance metrics
// Alert on critical issues
```

### 3. Backup and Recovery Testing

```bash
# Regular backup testing
# Recovery procedure validation
# Disaster recovery planning
```

## Future Considerations

### 1. Technology Updates

- Regular dependency updates
- Framework version upgrades
- Security patch management
- Performance optimization

### 2. Feature Enhancements

- User feedback integration
- Performance improvements
- New feature development
- Scalability planning

### 3. Infrastructure Evolution

- Cloud provider optimization
- Cost management
- Performance tuning
- Security hardening 