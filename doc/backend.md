# Backend API

## Overview

The backend is built using Next.js 14 Server Actions, providing a modern API layer without traditional REST endpoints. The system handles data operations, authentication, external integrations, and real-time updates through server-side functions.

## Server Actions Architecture

### 1. Core Server Actions

#### CRUD Operations (`src/app/actions/crud.ts`)

**Purpose:** Handle all song-related database operations with authentication and validation.

**Key Functions:**

##### Create Song
```typescript
export async function createSong(song: EditableSong): Promise<CreateSongReturnType> {
  const authResult = await auth();
  if (!authResult) {
    return { success: false, message: "Unauthorized" };
  }

  const validation = validateSong(song);
  if (!validation.success) {
    return { success: false, message: validation.message };
  }

  const newSong = await prisma.song.create({
    data: {
      title: song.title,
      artist: song.artist,
      lang: song.lang,
      tag: song.tag,
      remark: song.remark,
      url: song.url,
      extra: {},
    },
  });

  return { success: true, song: newSong };
}
```

##### Read Songs
```typescript
export async function readSongAllNoCacheLatest(): Promise<ReadSongReturnType> {
  const songs = await prisma.song.findMany({
    orderBy: { created_on: "desc" },
  });
  return { songs };
}
```

##### Update Song
```typescript
export async function updateSong(song: EditableSong): Promise<UpdateSongReturnType> {
  const authResult = await auth();
  if (!authResult) {
    return { success: false, message: "Unauthorized" };
  }

  // Bilibili integration for video metadata
  let video_created_on: string | undefined;
  if (song.url) {
    const bvid = extractBvidFromUrl(song.url);
    if (bvid !== null) {
      const response = await getVideoInfo({ bvid });
      if (response.data) {
        video_created_on = new Date(response.data.pubdate * 1000).toISOString();
      }
    }
  }

  const updatedSong = await prisma.song.update({
    where: { id: song.id },
    data: {
      title: song.title,
      artist: song.artist,
      lang: song.lang,
      tag: song.tag,
      remark: song.remark,
      url: song.url,
      extra: {
        ...oldSong.extra,
        video_created_on,
        bucket_url: song.bucket_url,
      },
    },
  });

  return { success: true, song: updatedSong };
}
```

#### Reaction System (`src/app/actions/reaction.ts`)

**Purpose:** Handle like/dislike reactions using raw SQL for atomic updates.

```typescript
export async function likeSong(id: number) {
  return await prisma.$executeRaw`
    UPDATE "Song" 
    SET extra = jsonb_set(
      extra, 
      '{numLikes}', 
      (COALESCE(extra->>'numLikes','0')::int + 1)::text::jsonb
    ) 
    WHERE id = ${id};
  `;
}

export async function dislikeSong(id: number) {
  return await prisma.$executeRaw`
    UPDATE "Song" 
    SET extra = jsonb_set(
      extra, 
      '{numDislikes}', 
      (COALESCE(extra->>'numDislikes','0')::int + 1)::text::jsonb
    ) 
    WHERE id = ${id};
  `;
}
```

#### Authentication (`src/app/actions/userLogin.ts`)

**Purpose:** Handle user login with JWT token generation.

```typescript
export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return { success: false, message: "用户不存在" };
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return { success: false, message: "密码错误" };
  }

  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY));

  cookies().set("currentUser", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return { success: true };
}
```

### 2. Authentication System

#### JWT Implementation (`src/lib/auth.ts`)

```typescript
export async function verifyJwtToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY)
    );
    return !!payload.username;
  } catch {
    return false;
  }
}

export async function auth(): Promise<boolean> {
  const currentUser = cookies().get("currentUser")?.value;
  const jwtVerified = currentUser && (await verifyJwtToken(currentUser));
  return jwtVerified;
}
```

#### Middleware Protection (`src/middleware.ts`)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("currentUser")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

### 3. External Integrations

#### Bilibili API Integration (`src/lib/bilibili.ts`)

**Purpose:** Fetch video metadata from Bilibili for song entries.

```typescript
export async function getVideoInfo(
  param: GetVideoInfoArg
): Promise<GetVideoInfoResponse> {
  const API_URL = "https://api.bilibili.com/x/web-interface/view";

  let url: string;
  if (param.bvid) {
    url = `${API_URL}?bvid=${param.bvid}`;
  } else {
    url = `${API_URL}?aid=${param.aid}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": USER_AGENT,
    },
  });
  
  const body = await response.json();
  return body;
}
```

**URL Extraction:**
```typescript
export function extractBvidFromUrl(url: string): string | null {
  const bvidMatch = url.match(/BV[a-zA-Z0-9]+/);
  return bvidMatch ? bvidMatch[0] : null;
}
```

#### Utility Functions (`src/lib/utils.ts`)

**Data Processing:**
```typescript
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
```

### 4. Database Connection

#### Prisma Client (`src/db.ts`)

```typescript
import { PrismaClient } from "@/generated/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

## API Response Types

### 1. Standard Response Format

```typescript
interface ActionReturnTypeBase {
  success: boolean;
  message?: string;
}

interface CreateSongReturnType extends ActionReturnTypeBase {
  song?: Song;
}

interface ReadSongReturnType {
  songs: Song[];
}

interface UpdateSongReturnType extends ActionReturnTypeBase {
  song?: Song;
}
```

### 2. Error Handling

```typescript
// Validation errors
if (!song.title) {
  return { success: false, message: "歌曲名不能为空" };
}

// Authentication errors
if (!authResult) {
  return { success: false, message: "Unauthorized" };
}

// Database errors
if (oldSong === null) {
  return { success: false, message: "神奇bug，请马上联系星辰Hikari" };
}
```

## Data Validation

### 1. Input Validation

```typescript
function validateSong(song: EditableSong) {
  if (!song.title) {
    return { success: false, message: "歌曲名不能为空" };
  }

  // Sanitize empty URL
  if (!song.url) {
    song.url = null;
  }

  if (song.url !== null && !isValidHttpUrl(song.url)) {
    return { success: false, message: "歌曲链接不合法" };
  }

  return { success: true };
}
```

### 2. URL Validation

```typescript
function isValidHttpUrl(urlString: string) {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
```

## Security Implementation

### 1. Authentication Security

**Password Hashing:**
```typescript
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
```

**JWT Security:**
```typescript
const token = await new SignJWT({ username })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("24h")
  .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY));
```

### 2. Cookie Security

```typescript
cookies().set("currentUser", token, {
  httpOnly: true,           // Prevent XSS
  secure: process.env.NODE_ENV === "production", // HTTPS only
  sameSite: "strict",       // CSRF protection
  maxAge: 60 * 60 * 24,     // 24 hours
});
```

### 3. Input Sanitization

**SQL Injection Prevention:**
- Prisma ORM provides automatic SQL injection protection
- Raw SQL queries use parameterized queries

**XSS Prevention:**
- React automatically escapes content
- No direct HTML insertion

## Performance Optimizations

### 1. Database Query Optimization

**Selective Field Loading:**
```typescript
const songs = await prisma.song.findMany({
  select: {
    id: true,
    title: true,
    artist: true,
    lang: true,
    tag: true,
    extra: true,
  },
  orderBy: { created_on: "desc" },
});
```

**Connection Pooling:**
- Uses `POSTGRES_PRISMA_URL` for pooled connections
- Automatic connection management

### 2. Caching Strategy

**Server-Side Caching:**
```typescript
// Disable cache for real-time data
export async function readSongAllNoCacheLatest() {
  const _cookies = cookies(); // Force cache invalidation
  const songs = await prisma.song.findMany({
    orderBy: { created_on: "desc" },
  });
  return { songs };
}
```

### 3. Error Handling

**Graceful Degradation:**
```typescript
try {
  const response = await getVideoInfo({ bvid });
  if (response.data) {
    // Process video data
  }
} catch (error) {
  // Continue without video metadata
  console.error("Failed to fetch video info:", error);
}
```

## Monitoring and Logging

### 1. Error Logging

```typescript
// Structured error logging
console.error("Database operation failed:", {
  operation: "createSong",
  error: error.message,
  timestamp: new Date().toISOString(),
});
```

### 2. Performance Monitoring

```typescript
// Query performance tracking
const startTime = Date.now();
const result = await prisma.song.findMany();
const duration = Date.now() - startTime;

if (duration > 1000) {
  console.warn("Slow query detected:", { duration, operation: "findMany" });
}
```

## Testing Strategy

### 1. Unit Testing

**Server Action Testing:**
```typescript
describe("createSong", () => {
  it("should create song with valid data", async () => {
    const song = { title: "Test Song", artist: "Test Artist" };
    const result = await createSong(song);
    expect(result.success).toBe(true);
  });

  it("should reject unauthorized requests", async () => {
    // Mock authentication failure
    const result = await createSong(song);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Unauthorized");
  });
});
```

### 2. Integration Testing

**Database Integration:**
```typescript
describe("Database Operations", () => {
  beforeEach(async () => {
    await prisma.song.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
```

## Deployment Considerations

### 1. Environment Variables

```env
# Required environment variables
POSTGRES_PRISMA_URL="postgresql://user:password@host:port/database"
NEXT_PUBLIC_JWT_SECRET_KEY="your-secret-key"

# Optional environment variables
NODE_ENV="production"
```

### 2. Database Migrations

```bash
# Production deployment
pnpm prisma generate
pnpm prisma migrate deploy
```

### 3. Health Checks

```typescript
// Health check endpoint
export async function healthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "healthy", database: "connected" };
  } catch (error) {
    return { status: "unhealthy", database: "disconnected" };
  }
}
```

## Future Enhancements

### 1. API Rate Limiting

```typescript
// Implement rate limiting for public endpoints
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### 2. Caching Layer

```typescript
// Redis caching for frequently accessed data
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedSongs() {
  const cached = await redis.get('songs');
  if (cached) {
    return JSON.parse(cached);
  }
  
  const songs = await prisma.song.findMany();
  await redis.setex('songs', 300, JSON.stringify(songs)); // 5 minutes
  return songs;
}
```

### 3. WebSocket Integration

```typescript
// Real-time updates for reactions
import { Server } from 'socket.io';

io.on('connection', (socket) => {
  socket.on('song-reaction', async (data) => {
    await handleReaction(data);
    io.emit('reaction-updated', data);
  });
});
``` 