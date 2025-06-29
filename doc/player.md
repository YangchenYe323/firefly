# Audio Player

## Overview

Firefly features a custom HTML5 audio player built with React and TypeScript. The player provides a rich audio experience with playlist management, multiple play modes, seamless integration with the main application, and modern UI design that matches the overall application aesthetic.

## Design Philosophy

### 1. Why a Custom Player?

**Separation of Concerns:** The player is designed as a singleton service to avoid multiple audio instances and ensure consistent state across the application. This prevents conflicts when multiple components try to control audio playback.

**State Management:** HTML5 audio elements don't naturally integrate with React's state management. The custom player bridges this gap by providing a React-friendly interface while maintaining the performance benefits of native audio APIs.

**Cross-Component Communication:** The player needs to be accessible from anywhere in the app (song list, player UI, keyboard shortcuts). A singleton pattern with pub/sub ensures all components stay synchronized.

**Modern UI Integration:** The player seamlessly integrates with the song list through play buttons, album artwork, and responsive design that works across all devices.

### 2. Architecture Rationale

**Singleton Pattern:** Only one audio instance should exist to prevent multiple songs playing simultaneously. The singleton ensures global access while maintaining controlled state.

**Pub/Sub Pattern:** React components need to react to player state changes (play/pause, track changes, time updates). The pub/sub system allows components to subscribe to relevant state changes without tight coupling.

**Wrapper Abstraction:** HTML5 audio has a complex event system and browser inconsistencies. The AudioWrapper provides a clean, consistent interface while handling browser-specific quirks.

## Player State Integration

### 1. HTML5 Audio to React Bridge

The core challenge is connecting the imperative HTML5 audio API with React's declarative state management. Here's how it's solved:

```typescript
// The player maintains internal state that mirrors HTML5 audio state
class Player {
  private audio: HTMLAudioElement;
  private state: PlayerState;
  private subscribers: Set<(state: PlayerState) => void>;

  // When HTML5 audio state changes, update React state
  private handleTimeUpdate = () => {
    this.updateState({ 
      currentTime: this.audio.currentTime,
      duration: this.audio.duration 
    });
  };

  private handlePlay = () => {
    this.updateState({ isPlaying: true, isLoading: false });
  };

  private handlePause = () => {
    this.updateState({ isPlaying: false });
  };

  // Notify all React components of state changes
  private updateState(partialState: Partial<PlayerState>) {
    this.state = { ...this.state, ...partialState };
    this.subscribers.forEach(callback => callback(this.state));
  }
}
```

### 2. React Hooks Integration

The `usePlayer` hook creates the bridge between the singleton player and React components:

```typescript
export function usePlayer() {
  // Initialize with current player state
  const [playerState, setPlayerState] = useState<PlayerState>(() => 
    getPlayerSingleton().getState()
  );

  useEffect(() => {
    const player = getPlayerSingleton();
    
    // Subscribe to player state changes
    const unsubscribe = player.subscribe(setPlayerState);
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Return state + actions for easy component use
  return {
    ...playerState,
    play: () => getPlayerSingleton().play(),
    pause: () => getPlayerSingleton().pause(),
    // ... other actions
  };
}
```

**Why This Design?**
- **Immediate State Access:** Components get current state on mount
- **Automatic Updates:** Components re-render when player state changes
- **Memory Safety:** Subscriptions are cleaned up on unmount
- **Performance:** Only subscribed components re-render

### 3. State Synchronization Flow

```
HTML5 Audio Event → Player State Update → Pub/Sub Notification → React Re-render
```

**Example Flow:**
1. User clicks play button
2. Component calls `player.play()`
3. Player sets `audio.play()` (HTML5 API)
4. HTML5 audio fires `play` event
5. Player updates internal state: `{ isPlaying: true }`
6. Player notifies all subscribers
7. React components re-render with new state
8. UI shows playing state (play button becomes pause, progress bar animates)

## Song List Integration

### 1. Play Button Overlay

The player integrates seamlessly with the song list through play button overlays on album artwork:

```typescript
// In SongRow component
const isPlayable = bucketUrl !== undefined && bucketUrl !== null && bucketUrl.trim() !== '';
const isCurrentlyPlaying = currentTrack && 
  currentTrack.title === song.title && 
  currentTrack.artist === song.artist &&
  playing;

// Play button overlay on album art
{isPlayable && (
  <>
    {/* Desktop: Hover overlay */}
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hidden md:flex">
      <button
        onClick={isCurrentlyPlaying ? handlePauseClick : handlePlayClick}
        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        title={isCurrentlyPlaying ? "暂停歌曲" : "播放歌曲"}
      >
        {isCurrentlyPlaying ? (
          <Icons.player_pause_button className="w-4 h-4 fill-black" />
        ) : (
          <Icons.player_play_button className="w-4 h-4 fill-black ml-0.5" />
        )}
      </button>
    </div>
    
    {/* Mobile: Only show when currently playing */}
    {isCurrentlyPlaying && (
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center md:hidden">
        <button
          onClick={handlePauseClick}
          className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-colors"
          title="暂停歌曲"
        >
          <Icons.player_pause_button className="w-4 h-4 fill-black" />
        </button>
      </div>
    )}
  </>
)}
```

**Design Benefits:**
- **Intuitive Interaction:** Users can play songs directly from the list
- **Visual Feedback:** Clear indication of playable songs and current playback
- **Mobile Optimized:** Different behavior for touch devices
- **Consistent UX:** Same interaction pattern across the app

### 2. Playable Song Indicators

Songs with available audio files are clearly marked:

```typescript
// Musical note icon for playable songs
{isPlayable && (
  <Icons.music_note className="w-4 h-4 text-blue-500 flex-shrink-0" title="可播放" />
)}

// Playable filter tag at the front of filter list
const filters: Filter[] = [
  filterAll,
  {
    value: "可播放",
    predicate: filterOnPlayable,
  },
  // ... other filters
];
```

### 3. Queue Management

When a song is played from the list, the player intelligently manages the queue:

```typescript
const onPlaySong = (song: Song) => {
  if (!song.extra?.bucket_url) {
    toast.error("这首歌没有可播放的音频文件");
    return;
  }

  try {
    const player = getPlayerSingleton();
    
    // Get all playable songs from the current filtered data
    const playableSongs = finalData.filter(s => {
      const bucketUrl = s.extra?.bucket_url;
      return bucketUrl !== undefined && bucketUrl !== null && bucketUrl.trim() !== '';
    });
    
    // Convert songs to tracks
    const tracks = playableSongs.map(s => ({
      url: s.extra!.bucket_url!,
      title: s.title,
      artist: s.artist,
    }));
    
    // Find the index of the selected song in the playable tracks
    const selectedTrackIndex = tracks.findIndex(track => 
      track.title === song.title && track.artist === song.artist
    );
    
    // Set the queue with all playable songs and play the selected one
    player.setQueue(tracks, apiUrl);
    player.playTrack(selectedTrackIndex);
    
    // Show the player at the bottom
    if (onShowPlayer) {
      onShowPlayer();
    }

    toast.success(`正在播放: ${song.title}`);
  } catch (error) {
    console.error("Error playing song:", error);
    toast.error("播放失败，请稍后重试");
  }
};
```

**Benefits:**
- **Contextual Playlists:** Queue includes all currently filtered playable songs
- **Seamless Navigation:** Next/previous buttons work with the full filtered list
- **User Intent:** Respects the user's current filter and search context
- **Error Handling:** Graceful fallbacks for missing audio files

## Media Metadata Integration

### 1. iOS Lockscreen Support

The player integrates with the MediaSession API to provide rich metadata for iOS lockscreen and other media controls:

```typescript
// In player.ts
private setupMediaSession(track: Track, apiUrl?: string): void {
  if ('mediaSession' in navigator) {
    // Generate artwork URL for media metadata
    const artworkUrl = apiUrl
      ? `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&size=large`
      : null;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: 'Firefly Songs',
      artwork: artworkUrl ? [
        { src: artworkUrl, sizes: '512x512', type: 'image/jpeg' }
      ] : []
    });

    // Set up media session action handlers
    navigator.mediaSession.setActionHandler('play', () => this.play());
    navigator.mediaSession.setActionHandler('pause', () => this.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => this.prev());
    navigator.mediaSession.setActionHandler('nexttrack', () => this.next());
  }
}
```

**Features:**
- **Album Artwork:** Shows song artwork on iOS lockscreen
- **Song Information:** Displays title and artist information
- **Media Controls:** iOS media controls work with the player
- **Cross-Platform:** Works on all modern browsers that support MediaSession API

### 2. Album Artwork Generation

Album artwork is dynamically generated for both the UI and media metadata:

```typescript
// Construct album art URL for current track
const albumArtUrl = currentTrack && apiUrl
  ? `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(currentTrack.title)}&artist=${encodeURIComponent(currentTrack.artist)}&size=large`
  : null;

// In SongPlayer component
const albumArtUrl = currentTrack && apiUrl
  ? `${apiUrl}/api/v1/artwork?title=${encodeURIComponent(currentTrack.title)}&artist=${encodeURIComponent(currentTrack.artist)}&size=small`
  : null;
```

## Modern UI Design

### 1. Player Interface

The player features a modern, floating design that aligns with the song panel:

```typescript
// SongPlayer component with modern styling
return (
  <motion.div
    className="fixed bottom-0 left-0 right-0 duration-300 z-50"
    animate={{ y: visible ? 0 : 100 }}
    transition={{ type: "just", duration: 0 }}
  >
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/80 backdrop-blur-md rounded-t-xl shadow-xl border border-gray-200/50">
        <div className="flex items-center justify-between p-2">
          {/* Album Artwork */}
          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shadow-sm">
            {/* Album art or fallback icon */}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-1">
            {/* Previous, Play/Pause, Next buttons */}
          </div>

          {/* Song Info and Progress */}
          <div className="flex flex-col w-full h-full p-0 justify-start mx-2">
            {/* Song title, artist, and progress bar */}
          </div>

          {/* Mode and Close Controls */}
          <div className="flex justify-center items-center p-2">
            {/* Play mode and close buttons */}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);
```

**Design Features:**
- **Floating Design:** Appears as a modern floating control panel
- **Panel Alignment:** Matches the width and styling of the song panel
- **Glass Morphism:** Semi-transparent background with backdrop blur
- **Responsive Layout:** Adapts to different screen sizes
- **Smooth Animations:** Framer Motion for smooth show/hide transitions

### 2. Mobile Optimizations

The player is optimized for mobile devices with touch-friendly interactions:

```typescript
// Touch event handling for mobile
const handleTouchStart = (e: React.TouchEvent) => {
  touchStartRef.current = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
    time: Date.now()
  };
  hasScrolledRef.current = false;
};

const handleTouchMove = (e: React.TouchEvent) => {
  if (touchStartRef.current) {
    const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
    
    // If user has scrolled significantly, mark as scroll
    if (deltaY > 10) {
      hasScrolledRef.current = true;
    }
  }
};

const handleTouchEnd = (e: React.TouchEvent) => {
  if (touchStartRef.current && !hasScrolledRef.current) {
    const deltaTime = Date.now() - touchStartRef.current.time;
    
    // Only trigger if it's a quick tap (less than 300ms)
    if (deltaTime < 300) {
      handleCopy();
    }
  }
  
  touchStartRef.current = null;
};
```

**Mobile Features:**
- **Touch Detection:** Distinguishes between taps and scrolls
- **Single-Tap Play:** Album art is clickable for playable songs on mobile
- **Responsive Controls:** Buttons sized appropriately for touch
- **Gesture Support:** Respects scroll gestures while allowing tap interactions

## Audio Element Lifecycle Management

### 1. Why Dynamic Import?

The player component uses dynamic import to avoid SSR issues:

```typescript
const SongPlayer = dynamic(() => import("./components/SongPlayer"), {
  ssr: false,
});
```

**Rationale:**
- **SSR Incompatibility:** HTML5 audio APIs don't exist during server-side rendering
- **Hydration Mismatch:** Server and client would render different content
- **Performance:** Audio player code only loads when needed
- **Error Prevention:** Avoids "audio is not defined" errors during SSR

### 2. Audio Element Initialization

The audio element is created and configured once, then reused:

```typescript
class AudioWrapper {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    
    // Configure once, reuse everywhere
    this.audio.preload = 'metadata'; // Load basic info, not full file
    this.audio.crossOrigin = 'anonymous'; // Handle CORS for external files
    
    // Set up event listeners that never change
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // These listeners stay active for the entire app lifecycle
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('ended', this.handleEnded);
    // ... other events
  }
}
```

**Why This Approach?**
- **Performance:** Avoid recreating audio element for each song
- **Memory Efficiency:** Single audio instance, multiple tracks
- **State Preservation:** Volume, playback rate, etc. persist between tracks
- **Event Consistency:** Same event handlers for all playback

## Playlist Management Design

### 1. Track Loading Strategy

```typescript
private async loadTrack(track: Track): Promise<void> {
  try {
    // Update UI immediately (optimistic update)
    this.updateState({ 
      currentTrack: track,
      isLoading: true,
      error: null 
    });

    // Load audio file
    await this.audio.load(track.url);
    
    // Success - update state
    this.updateState({ 
      isLoading: false,
      currentTime: 0,
      duration: this.audio.duration 
    });
  } catch (error) {
    // Error - update state and try next track
    this.updateState({ 
      error: '无法加载音频文件',
      isLoading: false 
    });
    
    // Auto-advance to next track after delay
    setTimeout(() => this.next(), 2000);
  }
}
```

**Design Benefits:**
- **Immediate Feedback:** UI updates instantly when track changes
- **Error Recovery:** Automatically tries next track on failure
- **Loading States:** Shows loading indicator during file fetch
- **Graceful Degradation:** Continues playback even if one track fails

### 2. Play Mode Implementation

The play modes demonstrate how the player abstracts complex logic:

```typescript
private playNext(): void {
  switch (this.playMode) {
    case 'order':
      this.playNextInOrder();
      break;
    case 'repeat':
      this.playNextInRepeat();
      break;
    case 'random':
      this.playNextInRandom();
      break;
  }
}

private playNextInRandom(): void {
  if (this.tracks.length > 1) {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * this.tracks.length);
    } while (nextIndex === this.currentIndex && this.tracks.length > 1);
    
    this.currentIndex = nextIndex;
    this.playCurrentTrack();
  } else {
    this.pause(); // End of playlist
  }
}
```

**Why This Design?**
- **Strategy Pattern:** Easy to add new play modes
- **State Consistency:** All modes update the same state
- **User Experience:** Predictable behavior across modes
- **Maintainability:** Each mode is isolated and testable

## Performance Optimizations

### 1. Throttled Updates

HTML5 audio fires `timeupdate` events very frequently (multiple times per second). React components don't need such frequent updates:

```typescript
private throttledTimeUpdate = throttle((currentTime: number) => {
  this.updateState({ currentTime });
}, 100); // Update at most 10 times per second

private handleTimeUpdate = () => {
  this.throttledTimeUpdate(this.audio.currentTime);
};
```

**Benefits:**
- **Reduced Re-renders:** Components update less frequently
- **Better Performance:** Less CPU usage during playback
- **Smooth UI:** Still responsive enough for progress bars
- **Battery Life:** Especially important on mobile devices

### 2. Memory Management

The player carefully manages audio resources:

```typescript
private cleanupAudio(): void {
  this.audio.pause();
  this.audio.src = ''; // Clear source
  this.audio.load(); // Reset audio element
}

dispose(): void {
  this.cleanupAudio();
  this.subscribers.clear();
  this.tracks = [];
}
```

**Why This Matters:**
- **Memory Leaks:** Audio elements can hold large buffers
- **Browser Limits:** Too many audio instances can cause issues
- **Performance:** Clean audio state improves playback
- **Reliability:** Prevents audio conflicts

## Error Handling Strategy

### 1. Graceful Degradation

The player handles various failure scenarios:

```typescript
private handleError = (event: Event) => {
  const error = event.target as HTMLAudioElement;
  
  // Log error for debugging
  console.error('Audio error:', error.error);
  
  // Update UI state
  this.updateState({ 
    error: '音频加载失败',
    isLoading: false,
    isPlaying: false 
  });
  
  // Try to recover automatically
  setTimeout(() => {
    if (this.tracks.length > 1) {
      this.next(); // Try next track
    }
  }, 2000);
};
```

**Design Philosophy:**
- **User Experience:** Don't break the entire app for one bad file
- **Automatic Recovery:** Try to continue playback
- **Clear Feedback:** Tell user what went wrong
- **Debugging:** Log errors for troubleshooting

### 2. Network Resilience

```typescript
private async loadTrack(track: Track): Promise<void> {
  try {
    await this.audio.load(track.url);
  } catch (error) {
    // Network error - try again with exponential backoff
    if (error.name === 'NetworkError') {
      await this.retryWithBackoff(() => this.audio.load(track.url));
    } else {
      throw error; // Other errors don't retry
    }
  }
}
```

## Integration with React Components

### 1. Component State Synchronization

Components automatically stay in sync with player state:

```typescript
function SongPlayer({ visible, closePlayer, tracks }: SongPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    currentTrack,
    playMode,
    isLoading,
    error,
  } = usePlayer(); // Automatically syncs with player state

  // Component automatically re-renders when any of these values change
  return (
    <div className="player">
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      <ProgressBar current={currentTime} total={duration} />
      <PlayButton isPlaying={isPlaying} />
      {/* ... other UI elements */}
    </div>
  );
}
```

**Benefits:**
- **Declarative UI:** UI automatically reflects player state
- **No Manual Sync:** No need to manually update component state
- **Consistent State:** All components show the same information
- **Reactive Updates:** UI updates immediately when state changes

### 2. Cross-Component Communication

Multiple components can control the same player:

```typescript
// In SongTableRow.tsx
const handlePlaySong = (song: Song) => {
  const player = getPlayerSingleton();
  player.setPlaylist([{ id: song.id, title: song.title, url: song.extra?.bucket_url }]);
  player.play();
  setPlayerVisible(true); // Show player UI
};

// In SongPlayer.tsx
const { togglePlay, playNext, playPrevious } = usePlayerControls();

// In keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      getPlayerSingleton().togglePlay();
    }
  };
  // ...
}, []);
```

**Design Benefits:**
- **Single Source of Truth:** One player, multiple controllers
- **Consistent Behavior:** Same actions work from anywhere
- **Flexible UI:** Components can be anywhere in the component tree
- **Easy Testing:** Test player logic independently of UI

## Future Enhancements

### 1. Advanced Audio Features

The architecture supports advanced features:

```typescript
// Equalizer support
setEqualizer(settings: EqualizerSettings): void {
  const audioContext = new AudioContext();
  const source = audioContext.createMediaElementSource(this.audio);
  // Apply equalizer filters
}

// Crossfade between tracks
private crossfadeToNext(): void {
  // Fade out current track
  // Fade in next track
  // Smooth transition
}
```

### 2. Analytics Integration

```typescript
private trackPlaybackAnalytics(track: Track, duration: number): void {
  analytics.track('song_played', {
    song_id: track.id,
    play_duration: duration,
    play_mode: this.state.playMode,
  });
}
```

### 3. Enhanced Mobile Features

```typescript
// Background audio support
private setupBackgroundAudio(): void {
  // Enable background audio playback on mobile
  // Handle audio interruptions (calls, notifications)
  // Resume playback when app comes to foreground
}

// Gesture controls
private setupGestureControls(): void {
  // Swipe gestures for next/previous
  // Double-tap to seek
  // Pinch to adjust volume
}
```

The player architecture is designed to be extensible while maintaining the core principles of state synchronization, error resilience, and performance optimization.
