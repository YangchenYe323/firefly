# Frontend Components

## Overview

The frontend is built with Next.js 14 using the App Router pattern, React 18, TypeScript, and Tailwind CSS. The UI is designed to be responsive and user-friendly, featuring a custom audio player and admin interface.

## Page Structure

### 1. Main Application Flow

```
app/
├── layout.tsx          # Root layout with global styles
├── page.tsx           # Main landing page
├── Root.tsx           # Main application wrapper
├── globals.css        # Global styles
├── _variables.css     # CSS custom properties
├── components/        # Page-specific components
├── admin/            # Admin interface
└── login/            # Authentication page
```

### 2. Component Hierarchy

```
Root.tsx
├── StickyHeader
│   ├── MainNav
│   └── UserNav
├── Heading
├── SongPanel
│   ├── SearchGrid
│   └── SongTableRow (multiple)
└── SongPlayer (dynamic import)
```

## Core Components

### 1. Root Component (`src/app/Root.tsx`)

**Purpose:** Main application wrapper that orchestrates all components.

**Key Features:**
- State management for player visibility
- Dynamic import of SongPlayer to avoid SSR issues
- Layout structure with header, content, and footer

**Props:**
```typescript
interface PropType {
  songs: Song[];
  tracks: Track[];
  profile: VtuberProfile;
  footer: Footer;
}
```

**State Management:**
```typescript
const [playerVisible, setPlayerVisible] = useState(false);
```

### 2. SongPanel Component (`src/app/components/SongPanel.tsx`)

**Purpose:** Main content area displaying songs with search and filtering.

**Key Features:**
- Search functionality with Chinese input support
- Tag and language filtering
- Random song selection
- Song shuffling
- Copy to clipboard functionality

**State Management:**
```typescript
const [searchTerm, setSearchTerm] = useState("");
const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
const [shuffledSongs, setShuffledSongs] = useState<Song[]>([]);
```

**Filtering Logic:**
```typescript
const filteredSongs = useMemo(() => {
  return allSongs.filter((song) => {
    const matchesSearch = searchTerm === "" || 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => song.tag.includes(tag));
    
    const matchesLangs = selectedLangs.length === 0 || 
      selectedLangs.some(lang => song.lang.includes(lang));
    
    return matchesSearch && matchesTags && matchesLangs;
  });
}, [allSongs, searchTerm, selectedTags, selectedLangs]);
```

### 3. SongTableRow Component (`src/app/components/SongTableRow.tsx`)

**Purpose:** Individual song row with interaction capabilities.

**Key Features:**
- Song information display
- Like/dislike reactions
- Copy song info to clipboard
- External link handling
- Responsive design

**Props:**
```typescript
interface Props {
  song: Song;
  onReaction: (id: number, type: "like" | "dislike") => void;
}
```

**Interaction Handlers:**
```typescript
const handleLike = () => onReaction(song.id, "like");
const handleDislike = () => onReaction(song.id, "dislike");
const handleCopy = () => copyToClipboard(songInfo);
```

### 4. SongPlayer Component (`src/app/components/SongPlayer.tsx`)

**Purpose:** Custom audio player interface.

**Key Features:**
- Playlist management
- Playback controls (play, pause, next, prev)
- Volume control
- Progress bar
- Play mode switching (order, repeat, random)

**Props:**
```typescript
interface Props {
  visible: boolean;
  closePlayer: () => void;
  tracks: Track[];
}
```

**Integration:**
- Uses custom player from `src/lib/player`
- Dynamic import to avoid SSR issues
- Responsive design for mobile

### 5. SearchGrid Component (`src/app/components/SearchGrid.tsx`)

**Purpose:** Search and filter interface.

**Key Features:**
- Chinese input support
- Tag selection with checkboxes
- Language selection
- Clear filters functionality

**Components:**
- `ChineseInput` for proper Chinese character input
- Tag checkboxes with visual feedback
- Language dropdown/checkboxes

## UI Components

### 1. Shared Components (`src/components/`)

#### StickyHeader
```typescript
// Fixed header that stays at top during scroll
<StickyHeader>
  <div className="container flex h-14 items-center">
    {/* Header content */}
  </div>
</StickyHeader>
```

#### Icons
```typescript
// Comprehensive icon library
import { Icons } from "@/components/Icons";

// Usage
<Icons.music_note className="inline align-top" />
```

#### ChineseInput
```typescript
// Specialized input for Chinese characters
<ChineseInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="搜索歌曲..."
/>
```

### 2. Radix UI Components (`src/components/ui/`)

The project uses Radix UI primitives for accessible components:

- **Dialog** - Modal dialogs
- **Dropdown Menu** - Context menus
- **Avatar** - User avatars
- **Label** - Form labels
- **Slider** - Volume control
- **Slot** - Component composition

## Styling Architecture

### 1. Tailwind CSS Configuration

**Custom Configuration (`tailwind.config.ts`):**
```typescript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chinese: ["var(--font-chinese)", "sans-serif"],
      },
      colors: {
        // Custom color palette
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### 2. CSS Custom Properties (`src/app/_variables.css`)

```css
:root {
  --font-chinese: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", sans-serif;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more variables */
}
```

### 3. Global Styles (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
.font-chinese {
  font-family: var(--font-chinese);
}

/* Animation classes */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## State Management

### 1. Local State (React Hooks)

**Component State:**
```typescript
// Search and filter state
const [searchTerm, setSearchTerm] = useState("");
const [selectedTags, setSelectedTags] = useState<string[]>([]);

// UI state
const [playerVisible, setPlayerVisible] = useState(false);
const [isLoading, setIsLoading] = useState(false);
```

### 2. Global State

**Audio Player State:**
```typescript
// Singleton player instance
const player = getPlayerSingleton();

// Subscribe to player state changes
useEffect(() => {
  const unsubscribe = player.subscribe(setPlayerState);
  return unsubscribe;
}, []);
```

**Authentication State:**
```typescript
// JWT token stored in cookies
const currentUser = cookies().get("currentUser")?.value;
```

### 3. Server State

**Data Fetching:**
```typescript
// Server-side data fetching in page.tsx
const { songs } = await readSongAllNoCacheLatest();
const footers = await readFooters();
```

## Responsive Design

### 1. Mobile-First Approach

**Breakpoints:**
```css
/* Tailwind breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

**Responsive Components:**
```typescript
// Conditional rendering based on screen size
<span className="hidden md:inline">播放器</span>

// Responsive grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 2. Touch-Friendly Interface

**Mobile Optimizations:**
- Larger touch targets (minimum 44px)
- Swipe gestures for player controls
- Optimized spacing for mobile screens
- Touch-friendly buttons and controls

## Performance Optimizations

### 1. Code Splitting

**Dynamic Imports:**
```typescript
// Lazy load heavy components
const SongPlayer = dynamic(() => import("./components/SongPlayer"), {
  ssr: false,
});
```

### 2. Memoization

**React.memo for Components:**
```typescript
const SongTableRow = React.memo(({ song, onReaction }: Props) => {
  // Component implementation
});
```

**useMemo for Expensive Calculations:**
```typescript
const filteredSongs = useMemo(() => {
  return allSongs.filter(/* filtering logic */);
}, [allSongs, searchTerm, selectedTags, selectedLangs]);
```

### 3. Image Optimization

**Next.js Image Component:**
```typescript
<Image
  src={profile.avatarImagePath}
  alt="Avatar"
  width={40}
  height={40}
  className="rounded-full"
  priority={true}
/>
```

## Accessibility

### 1. ARIA Labels

```typescript
<button
  aria-label="Like song"
  onClick={handleLike}
  className="text-muted-foreground hover:text-primary"
>
  <Icons.heart className="h-4 w-4" />
</button>
```

### 2. Keyboard Navigation

```typescript
// Keyboard shortcuts for player
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
      player.togglePlay();
    }
  };
  
  document.addEventListener("keydown", handleKeyPress);
  return () => document.removeEventListener("keydown", handleKeyPress);
}, []);
```

### 3. Screen Reader Support

```typescript
// Semantic HTML structure
<main role="main">
  <section aria-label="Song list">
    {/* Song content */}
  </section>
</main>
```

## Error Handling

### 1. Error Boundaries

```typescript
// Component error handling
const [error, setError] = useState<string | null>(null);

if (error) {
  return <div className="text-red-500">Error: {error}</div>;
}
```

### 2. Loading States

```typescript
// Loading indicators
const [isLoading, setIsLoading] = useState(false);

{isLoading && <div className="animate-spin">Loading...</div>}
```

### 3. Fallback UI

```typescript
// Graceful degradation
{!audioSupported && (
  <div className="text-muted-foreground">
    Audio player not supported in this browser
  </div>
)}
```

## Internationalization

### 1. Chinese Language Support

**Font Configuration:**
```css
.font-chinese {
  font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", sans-serif;
}
```

**Input Handling:**
```typescript
// Specialized Chinese input component
<ChineseInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="搜索歌曲..."
/>
```

### 2. Text Content

**Hardcoded Chinese Text:**
- Song titles and artist names
- UI labels and buttons
- Error messages
- Footer content

## Testing Considerations

### 1. Component Testing

**Test Structure:**
```typescript
describe("SongPanel", () => {
  it("should filter songs by search term", () => {
    // Test implementation
  });
  
  it("should handle empty search results", () => {
    // Test implementation
  });
});
```

### 2. Integration Testing

**User Flow Testing:**
- Search and filter functionality
- Audio player interactions
- Admin operations
- Responsive behavior

### 3. Accessibility Testing

**Automated Testing:**
- ARIA label validation
- Keyboard navigation
- Screen reader compatibility
- Color contrast verification 