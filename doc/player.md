# Audio Player

## Overview

Firefly features a custom HTML5 audio player built with React and TypeScript. The player provides a rich audio experience with playlist management, multiple play modes, and seamless integration with the main application.

## Design Philosophy

### 1. Why a Custom Player?

**Separation of Concerns:** The player is designed as a singleton service to avoid multiple audio instances and ensure consistent state across the application. This prevents conflicts when multiple components try to control audio playback.

**State Management:** HTML5 audio elements don't naturally integrate with React's state management. The custom player bridges this gap by providing a React-friendly interface while maintaining the performance benefits of native audio APIs.

**Cross-Component Communication:** The player needs to be accessible from anywhere in the app (song list, player UI, keyboard shortcuts). A singleton pattern with pub/sub ensures all components stay synchronized.

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

The player architecture is designed to be extensible while maintaining the core principles of state synchronization, error resilience, and performance optimization.
