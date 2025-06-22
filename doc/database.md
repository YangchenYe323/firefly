# Database Design

## Overview

Firefly uses PostgreSQL as the primary database with Prisma ORM for type-safe database operations. The database is designed to store song information, user accounts, feedback, and dynamic content with flexible JSON metadata storage.

## Database Schema

### Core Models

#### 1. Song Model

The central model for storing song information with flexible metadata.

```prisma
model Song {
  id         Int      @id @default(autoincrement())
  title      String   // Song title
  artist     String   // Artist name
  lang       String[] // Languages (array)
  tag        String[] // Tags (array)
  url        String?  // Optional external URL
  remark     String   // Additional notes
  created_on DateTime @default(now())
  extra      Json     // Flexible metadata storage
}
```

**Key Features:**
- Auto-incrementing primary key
- Array fields for languages and tags
- Optional URL for external links
- JSON field for flexible metadata
- Timestamp for creation tracking

**JSON Metadata Structure (`extra` field):**
```typescript
interface SongExtra {
  numLikes?: number;           // Like count
  numDislikes?: number;        // Dislike count
  bucket_url?: string;         // Audio file URL
  video_created_on?: string;   // Bilibili video creation date
  // Extensible for future features
}
```

#### 2. User Model

Admin user accounts for content management.

```prisma
model User {
  username      String @id
  salt          String // bcrypt salt
  password_hash String // bcrypt hash
}
```

**Security Features:**
- Username as primary key
- bcrypt password hashing with salt
- No plain text password storage

#### 3. Feedback Model

User feedback system for collecting user input.

```prisma
model Feedback {
  id         String   @id @default(uuid())
  content    String   // Feedback content
  created_on DateTime @default(now())
}
```

**Features:**
- UUID primary key for anonymity
- Timestamp for feedback tracking
- Simple text-based feedback

#### 4. Footer Model

Dynamic footer content for the website.

```prisma
model Footer {
  id      Int    @id @default(autoincrement())
  content String // Footer text content
}
```

**Usage:**
- Random footer selection on each page load
- Simple content management
- Auto-incrementing ID

## Database Relationships

### Current Relationships

The current schema uses a simple flat structure with no explicit foreign key relationships:

```
Song (Independent)
├── No direct relationships
└── JSON metadata for flexible data

User (Independent)
├── No direct relationships
└── Authentication only

Feedback (Independent)
├── No direct relationships
└── Anonymous feedback collection

Footer (Independent)
├── No direct relationships
└── Content management
```

### Potential Future Relationships

For scalability, consider adding:

```prisma
// Future enhancement possibilities
model Song {
  id         Int      @id @default(autoincrement())
  // ... existing fields
  reactions  Reaction[] // One-to-many with reactions
  playlists  PlaylistSong[] // Many-to-many with playlists
}

model Reaction {
  id     String @id @default(uuid())
  songId Int
  song   Song   @relation(fields: [songId], references: [id])
  type   String // "like" | "dislike"
  // ... other fields
}

model Playlist {
  id    Int    @id @default(autoincrement())
  name  String
  songs PlaylistSong[]
}

model PlaylistSong {
  playlistId Int
  songId     Int
  playlist   Playlist @relation(fields: [playlistId], references: [id])
  song       Song     @relation(fields: [songId], references: [id])
  @@id([playlistId, songId])
}
```

## Data Operations

### 1. Song Operations

#### Create Song
```typescript
const newSong = await prisma.song.create({
  data: {
    title: "Song Title",
    artist: "Artist Name",
    lang: ["Chinese", "English"],
    tag: ["Pop", "Cover"],
    remark: "Additional notes",
    url: "https://example.com",
    extra: {},
  },
});
```

#### Read Songs
```typescript
// All songs ordered by creation date
const songs = await prisma.song.findMany({
  orderBy: { created_on: "desc" },
});

// Filtered songs
const filteredSongs = await prisma.song.findMany({
  where: {
    OR: [
      { title: { contains: searchTerm } },
      { artist: { contains: searchTerm } },
      { tag: { has: searchTerm } },
    ],
  },
});
```

#### Update Song
```typescript
const updatedSong = await prisma.song.update({
  where: { id: songId },
  data: {
    title: "Updated Title",
    extra: {
      ...existingExtra,
      bucket_url: "new-audio-url",
    },
  },
});
```

### 2. Reaction Operations

#### Like/Dislike Updates
```sql
-- Raw SQL for atomic updates
UPDATE "Song" 
SET extra = jsonb_set(
  extra, 
  '{numLikes}', 
  (COALESCE(extra->>'numLikes','0')::int + 1)::text::jsonb
) 
WHERE id = $1;
```

### 3. User Operations

#### Create User
```typescript
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

const user = await prisma.user.create({
  data: {
    username: "admin",
    salt,
    password_hash: hash,
  },
});
```

#### Verify User
```typescript
const user = await prisma.user.findUnique({
  where: { username },
});

const isValid = await bcrypt.compare(password, user.password_hash);
```

## Database Configuration

### 1. Prisma Configuration

```prisma
generator client {
  provider      = "prisma-client-js"
  output        = "../src/generated/client"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
}

generator json {
  provider  = "prisma-json-types-generator"
  namespace = "PrismaJson"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

### 2. Environment Variables

```env
POSTGRES_PRISMA_URL="postgresql://user:password@host:port/database"
NEXT_PUBLIC_JWT_SECRET_KEY="your-secret-key"
```

### 3. Connection Pooling

The project uses connection pooling through the `POSTGRES_PRISMA_URL` environment variable, which typically points to a pooled connection endpoint.

## Data Validation

### 1. Input Validation

```typescript
function validateSong(song: EditableSong) {
  if (!song.title) {
    return { success: false, message: "歌曲名不能为空" };
  }

  if (song.url && !isValidHttpUrl(song.url)) {
    return { success: false, message: "歌曲链接不合法" };
  }

  return { success: true };
}
```

### 2. URL Validation

```typescript
function isValidHttpUrl(urlString: string) {
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
```

## Performance Optimization

### 1. Indexing Strategy

**Recommended Indexes:**
```sql
-- For search performance
CREATE INDEX idx_song_title ON "Song" USING gin(to_tsvector('chinese', title));
CREATE INDEX idx_song_artist ON "Song" USING gin(to_tsvector('chinese', artist));
CREATE INDEX idx_song_tags ON "Song" USING gin(tag);
CREATE INDEX idx_song_lang ON "Song" USING gin(lang);

-- For ordering
CREATE INDEX idx_song_created_on ON "Song"(created_on DESC);
CREATE INDEX idx_song_id ON "Song"(id);

-- For JSON queries
CREATE INDEX idx_song_extra_bucket_url ON "Song" USING gin((extra->'bucket_url'));
```

### 2. Query Optimization

**Efficient Queries:**
```typescript
// Use select to limit fields
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

// Use pagination for large datasets
const songs = await prisma.song.findMany({
  take: 50,
  skip: offset,
  orderBy: { created_on: "desc" },
});
```

## Backup and Migration

### 1. Database Migrations

```bash
# Generate migration
pnpm prisma migrate dev --name add_new_field

# Apply migrations
pnpm prisma migrate deploy

# Reset database
pnpm prisma migrate reset
```

### 2. Data Backup

```bash
# Export data
pg_dump $DATABASE_URL > backup.sql

# Import data
psql $DATABASE_URL < backup.sql
```

### 3. Schema Changes

When modifying the schema:

1. Update `prisma/schema.prisma`
2. Generate migration: `pnpm prisma migrate dev`
3. Update generated types: `pnpm prisma generate`
4. Test thoroughly before deployment

## Security Considerations

### 1. Data Protection

- All passwords are hashed using bcrypt
- No sensitive data in JSON fields
- Input sanitization for all user inputs
- SQL injection prevention through Prisma

### 2. Access Control

- Admin-only access to sensitive operations
- JWT-based authentication
- Server-side validation for all operations

### 3. Data Privacy

- User feedback is anonymous (UUID-based)
- No personal data collection
- GDPR-compliant data handling 