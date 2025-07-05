# Song Occurrences Feature

## Overview

The Song Occurrences feature allows users to view when and where songs were performed in past vtuber live stream recordings. This feature is available on both the main page and admin page, providing a comprehensive view of song performance history.

## Features

### Main Page Integration

#### SongRow Component Enhancements
- **Expansion Button**: Each song row now has an expansion button (chevron icon) with "录播记录" text
- **Floating Sticky Behavior**: When expanded and scrolling, the song row floats at the top of the viewport for easy access
- **Touch-Friendly**: Optimized for mobile devices with proper touch event handling
- **Responsive Design**: Adapts to different screen sizes with appropriate styling

#### SongOccurrencesPanel Component
- **Infinite Scroll**: Loads occurrences in batches with smooth pagination
- **Loading States**: Shows loading indicators for initial load and pagination
- **Error Handling**: Displays error messages with retry functionality
- **Empty States**: Shows appropriate messages when no occurrences are found
- **Modern UI**: Clean, modern design with smooth animations

### Occurrence Cards

Each occurrence is displayed as a card showing:
- **Cover Image**: Video thumbnail with fallback for loading errors
- **Title**: Recording title with page number indicator
- **Progress Bar**: Visual representation of when the song starts in the video
- **Time Information**: Start time and total duration
- **Direct Link**: Clickable area that opens the Bilibili video at the exact timestamp

### Admin Page Features

The admin page includes additional functionality:
- **Delete Button**: Allows admins to remove occurrence records
- **Expandable Header**: Toggle button to show/hide the occurrences panel
- **Same Core Features**: Infinite scroll, loading states, and modern UI

## Technical Implementation

### Components

#### SongRow (`src/app/components/SongRow.tsx`)
- **Purpose**: Main song display component with expansion functionality
- **Key Features**:
  - Floating sticky positioning when expanded
  - Touch event handling for mobile devices
  - Integration with SongOccurrencesPanel
  - Responsive design with modern animations

#### SongOccurrencesPanel (`src/app/components/SongOccurrencesPanel.tsx`)
- **Purpose**: Displays song occurrences with infinite scroll
- **Key Features**:
  - Infinite scroll pagination using Intersection Observer
  - Separate loading states for initial load and pagination
  - Error handling and retry functionality
  - Smooth animations for expand/collapse

#### SongOccurrenceCard (Internal Component)
- **Purpose**: Individual occurrence display card
- **Key Features**:
  - Cover image with error handling
  - Progress bar showing song position
  - Direct link to Bilibili video with timestamp
  - Hover effects and accessibility features

### API Integration

#### Backend Action (`src/app/actions/song-occurrences.ts`)
- **Function**: `getSongOccurrences(songId, pageToken?, limit?)`
- **Features**:
  - Keyset pagination using pubdate
  - Efficient database queries with joins
  - Proper error handling and response formatting
  - Base64 encoded pagination tokens

### State Management

#### Pagination Logic
- **Initial Load**: Loads first batch when panel is expanded
- **Infinite Scroll**: Loads more data when user scrolls to bottom
- **State Reset**: Clears all data when panel is collapsed
- **Loading States**: Separate states for initial load and pagination

#### Floating Sticky Behavior
- **Scroll Detection**: Monitors scroll position to determine when to float
- **Positioning**: Uses `position: fixed` with proper z-index
- **Layout Preservation**: Placeholder div prevents content jumping
- **Auto Reset**: Returns to normal position when collapsed

## Usage Examples

### Basic Usage
```tsx
<SongRow
  song={songObject}
  onLikeSong={(id) => handleLike(id)}
  onDislikeSong={(id) => handleDislike(id)}
  apiUrl="https://api.example.com"
  onPlaySong={(song) => handlePlay(song)}
/>
```

### Occurrences Panel
```tsx
<SongOccurrencesPanel
  song={songObject}
  isExpanded={isExpanded}
  onToggleExpanded={() => setIsExpanded(!isExpanded)}
/>
```

## Styling and Design

### Design Principles
- **Consistency**: Matches existing design system and color scheme
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive**: Works on all device sizes
- **Performance**: Optimized for smooth scrolling and animations

### Key CSS Classes
- **Floating**: `fixed top-14 left-0 right-0 z-50`
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Tailwind CSS with mobile-first approach
- **Modern UI**: Backdrop blur, shadows, and hover effects

## Browser Compatibility

### Supported Features
- **Intersection Observer**: Modern browsers for infinite scroll
- **CSS Grid/Flexbox**: Modern layout systems
- **Touch Events**: Mobile device support
- **CSS Animations**: Smooth transitions and effects

### Fallbacks
- **Image Loading**: Fallback icons for failed image loads
- **Touch Events**: Graceful degradation for older devices
- **CSS Features**: Progressive enhancement approach

## Performance Considerations

### Optimization Strategies
- **Lazy Loading**: Images load only when needed
- **Pagination**: Loads data in small batches
- **State Management**: Efficient state updates and cleanup
- **Event Handling**: Proper cleanup of event listeners

### Memory Management
- **Observer Cleanup**: Intersection observers are properly disconnected
- **State Reset**: All state is cleared when components unmount
- **Event Listeners**: Scroll listeners are removed when not needed

## Future Enhancements

### Potential Improvements
- **Caching**: Cache occurrence data for better performance
- **Search**: Filter occurrences by date or recording
- **Analytics**: Track which occurrences are most viewed
- **Sharing**: Share specific occurrence links
- **Notifications**: Notify when new occurrences are added

### Technical Debt
- **Type Safety**: Ensure all TypeScript types are properly defined
- **Testing**: Add unit and integration tests
- **Documentation**: Keep documentation up to date
- **Performance**: Monitor and optimize as needed

## Troubleshooting

### Common Issues
1. **Infinite Loading**: Check pagination logic and API responses
2. **Image Loading**: Verify CDN settings and referrer policies
3. **Touch Events**: Ensure proper event handling on mobile devices
4. **Floating Behavior**: Check z-index and positioning values

### Debug Information
- Console logs for API calls and state changes
- Network tab for API request/response inspection
- React DevTools for component state debugging
- Browser dev tools for layout and styling issues 