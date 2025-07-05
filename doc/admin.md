# Admin Interface

## Overview

The admin interface provides a comprehensive content management system for 蝶蝶Hikari's song collection. It features an authenticated, table-based interface for managing songs with real-time editing capabilities, filtering, bulk operations, and lyrics search integration.

## Admin Architecture

### 1. Access Control

#### Authentication Flow
```
User Login → JWT Verification → Admin Access → Protected Routes
```

#### Route Protection (`src/middleware.ts`)
```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("currentUser")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
```

### 2. Admin Page Structure

```
admin/
├── page.tsx                    # Main admin page
└── components/
    ├── AdminLayout.tsx         # Main layout with responsive design
    ├── SongTable.tsx           # Compact table for browsing songs
    ├── EditPanel.tsx           # Form panel for editing songs
    └── LyricsSearch.tsx        # Lyrics search component
```

## Core Components

### 1. Admin Page (`src/app/admin/page.tsx`)

**Purpose:** Main admin interface entry point.

```typescript
export default function AdminPage() {
  return (
    <AdminLayout initialSongs={editableSongs} />
  );
}
```

**Features:**
- Container layout with proper spacing
- Responsive design with mobile-first approach
- Full-screen edit panel on mobile

### 2. AdminLayout (`src/app/admin/components/AdminLayout.tsx`)

**Purpose:** Main layout component managing table view and edit panel.

**Key Features:**
- Responsive layout (side-by-side on desktop, overlay on mobile)
- Search functionality
- State management for songs, editing, and creation
- CRUD operations with optimistic updates

**State Management:**
```typescript
const [songs, setSongs] = useState<EditableSong[]>([]);
const [searchQuery, setSearchQuery] = useState("");
const [selectedSong, setSelectedSong] = useState<EditableSong | null>(null);
const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
const [isCreating, setIsCreating] = useState(false);
const [isLoading, setIsLoading] = useState(false);
```

**Data Operations:**
```typescript
// Create song
const handleCreateSong = async (songData: EditableSong) => {
  const result = await createSong(songData);
  if (result.success) {
    setSongs([newSong, ...songs]);
    setIsEditPanelOpen(false);
  }
};

// Update song
const handleUpdateSong = async (songData: EditableSong) => {
  const result = await updateSong(songData);
  if (result.success) {
    setSongs(songs.map(s => s.id === songData.id ? updatedSong : s));
    setIsEditPanelOpen(false);
  }
};

// Delete song
const handleDeleteSong = async (song: EditableSong) => {
  const result = await deleteSong(song.id!);
  if (result.success) {
    setSongs(songs.filter(s => s.id !== song.id));
  }
};
```

### 3. SongTable (`src/app/admin/components/SongTable.tsx`)

**Purpose:** Compact table component for browsing songs.

**Features:**
- Responsive design (simplified columns on mobile)
- Search and filter integration
- Edit and delete actions
- Loading states and empty states

**Mobile Optimization:**
- Only shows ID, title (with artist subtitle), and action buttons
- Prevents horizontal scrolling
- Touch-friendly button sizes

### 4. EditPanel (`src/app/admin/components/EditPanel.tsx`)

**Purpose:** Form panel for editing and creating songs.

**Features:**
- Comprehensive form with all song fields
- Lyrics fragment editing
- Tag and language management
- Form validation
- Mobile-optimized layout

**Form Structure:**
```typescript
interface EditableSong {
  id?: number;
  title: string;
  artist: string;
  lang: string[];
  tag: string[];
  url: string | null;
  remark: string;
  lyrics_fragment: string;
  bucket_url: string;
}
```

### 5. LyricsSearch (`src/app/admin/components/LyricsSearch.tsx`)

**Purpose:** Component for searching and selecting lyrics from external API.

**Features:**
- Integration with lyrics search API
- Search results displayed as cards
- One-click field population
- Loading states and error handling
- Mobile-responsive design

**API Integration:**
```typescript
interface LyricsSearchResult {
  title: string;
  artist: string;
  album: string;
  lyrics_fragment: string;
}

const searchLyrics = async (title: string, segments: number = 3) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/song/search?title=${encodeURIComponent(title)}&segments=${segments}`
  );
  return response.json() as LyricsSearchResult[];
};
```

## Lyrics Search Integration

### API Endpoint

The lyrics search functionality integrates with an external API:

**Endpoint:** `${NEXT_PUBLIC_API_URL}/api/v1/song/search`

**Parameters:**
- `title` (string): Song title to search for
- `segments` (number): Number of lyric segments to return

**Response:**
```typescript
interface LyricsSearchResult {
  title: string;        // Song title
  artist: string;       // Song artist
  album: string;        // Song album
  lyrics_fragment: string; // Lyrics fragment
}
```

### User Flow

1. **Search Initiation:** User enters song title in the edit panel
2. **API Call:** System calls lyrics search API with title
3. **Results Display:** Search results shown as clickable cards
4. **Field Population:** User clicks result to populate form fields
5. **Manual Editing:** User can further edit populated fields

### Implementation Details

**Debounced Search:**
```typescript
const debouncedSearch = useMemo(
  () => debounce(async (title: string) => {
    if (title.length < 2) return;
    setIsSearching(true);
    try {
      const results = await searchLyrics(title, 3);
      setSearchResults(results);
    } catch (error) {
      setSearchError("搜索失败，请稍后重试");
    } finally {
      setIsSearching(false);
    }
  }, 500),
  []
);
```

**Result Selection:**
```typescript
const handleResultSelect = (result: LyricsSearchResult) => {
  setFormData(prev => ({
    ...prev,
    title: result.title,
    artist: result.artist,
    lyrics_fragment: result.lyrics_fragment,
  }));
  setSearchResults([]);
  setSearchQuery("");
};
```

## Responsive Design

### Desktop Layout
- Side-by-side table and edit panel
- Full table with all columns visible
- Compact edit panel with scrollable form

### Mobile Layout
- Full-screen edit panel overlay
- Simplified table (ID, title, actions only)
- Touch-optimized controls and spacing
- Proper keyboard handling for form inputs

### Breakpoints
- Mobile: `< 768px` - Full-screen overlay, simplified table
- Tablet: `768px - 1024px` - Stacked layout
- Desktop: `> 1024px` - Side-by-side layout

## Error Handling

### Network Errors
```typescript
const handleApiCall = async (apiFunction: () => Promise<any>) => {
  try {
    return await apiFunction();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("网络连接失败，请检查网络设置");
    } else {
      toast.error("服务器错误，请稍后重试");
    }
    throw error;
  }
};
```

### Validation Errors
```typescript
const validateSong = (song: EditableSong) => {
  if (!song.title.trim()) {
    return { success: false, message: "歌曲名不能为空" };
  }
  
  if (!song.artist.trim()) {
    return { success: false, message: "歌手名不能为空" };
  }
  
  return { success: true };
};
```

## Performance Optimizations

### 1. Debounced Search
- Prevents excessive API calls during typing
- 500ms delay before triggering search
- Minimum 2 characters required

### 2. Optimistic Updates
- Immediate UI updates for better perceived performance
- Rollback on API failure
- Loading states for user feedback

### 3. Virtual Scrolling (Future Enhancement)
- For large datasets
- Efficient rendering of long song lists
- Maintains smooth scrolling performance

## Security Features

### 1. Authentication Verification
```typescript
const auth = async () => {
  const currentUser = cookies().get("currentUser")?.value;
  const jwtVerified = currentUser && (await verifyJwtToken(currentUser));
  return jwtVerified;
};
```

### 2. Input Validation
- Server-side validation for all form fields
- XSS prevention through proper escaping
- SQL injection prevention via Prisma ORM

### 3. CSRF Protection
- JWT tokens with proper expiration
- Secure cookie handling
- Request origin validation

## Future Enhancements

### 1. Bulk Operations
- Bulk delete functionality
- Batch import/export
- Mass tag updates

### 2. Advanced Search
- Multi-column filtering
- Date range filtering
- Saved search queries

### 3. Import/Export
- CSV import/export
- JSON data exchange
- Backup and restore functionality

### 4. Real-time Collaboration
- WebSocket integration
- Multi-user editing
- Change tracking and history 