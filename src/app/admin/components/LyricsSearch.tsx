"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Music, User, FileText } from "lucide-react";
import { debounce } from "lodash";

/**
 * Interface for lyrics search results returned from the API
 */
interface LyricsSearchResult {
  title: string;
  artist: string;
  album: string;
  lyrics_fragment: string;
}

/**
 * Props for the LyricsSearch component
 */
interface LyricsSearchProps {
  /** Callback when user selects all song info (title, artist, lyrics) */
  onSelectLyrics: (result: { title: string; artist: string; lyrics_fragment: string }) => void;
  /** Callback when user selects only the title */
  onSelectTitle: (title: string) => void;
  /** Callback when user selects only the artist */
  onSelectArtist: (artist: string) => void;
  /** Callback when user selects only the lyrics fragment */
  onSelectLyricsOnly: (lyrics: string) => void;
  /** Current song title to search for */
  currentTitle?: string;
  /** Number of segments to request from the API (default: 10) */
  segments?: number;
}

/**
 * LyricsSearch Component
 * 
 * This component provides lyrics search functionality with the following features:
 * - Automatic search when title changes
 * - Debounced API calls to prevent excessive requests
 * - Individual selection of title, artist, or lyrics
 * - Configurable segment count for lyrics length
 * - Error handling and loading states
 */
export function LyricsSearch({ 
  onSelectLyrics, 
  onSelectTitle, 
  onSelectArtist, 
  onSelectLyricsOnly, 
  currentTitle,
  segments = 10
}: LyricsSearchProps) {
  // State for managing search results and UI
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<LyricsSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Debounced search function
   * 
   * WHY DEBOUNCE IS NECESSARY:
   * 1. Performance: Prevents excessive API calls when user types quickly
   * 2. Rate Limiting: Avoids hitting API rate limits
   * 3. User Experience: Reduces network traffic and improves responsiveness
   * 4. Cost: Minimizes unnecessary API requests (important for paid APIs)
   * 
   * The debounce waits 500ms after the last keystroke before making the API call.
   * This means if a user types "hello world" quickly, only one API call is made
   * instead of 11 separate calls (one for each character).
   */
  const performSearch = useCallback(
    debounce(async (title: string, currentSegments: number) => {
      // Don't search if title is empty
      if (!title.trim()) {
        setResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          setError("API URL not configured");
          setIsLoading(false);
          return;
        }

        // Make API request with title and segments parameters
        const response = await fetch(
          `${apiUrl}/api/v1/song/search?title=${encodeURIComponent(title)}&segments=${currentSegments}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setError(`API request failed with status: ${response.status}`);
          setResults([]);
        } else {
          const data = await response.json();
          console.log("API response:", data); // Debug log for troubleshooting
          
          // Extract songs array from the response object
          // API returns { songs: [...] } structure
          const songs = data.songs || [];
          setResults(Array.isArray(songs) ? songs : []);
        }
      } catch (err) {
        console.error("Search error:", err); // Debug log for troubleshooting
        setError("搜索时发生错误");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500), // 500ms debounce delay
    []
  );

  /**
   * Effect to trigger search when title or segments change
   * 
   * This ensures that:
   * 1. Search is performed automatically when user types in the title field
   * 2. Search is re-triggered when segments count is changed
   * 3. Results are cleared when title is empty
   */
  useEffect(() => {
    if (currentTitle) {
      performSearch(currentTitle, segments);
    } else {
      setResults([]);
      setError(null);
    }
  }, [currentTitle, segments, performSearch]);

  /**
   * Handler for when user clicks on a result card to copy all info
   */
  const handleSelectLyrics = (result: LyricsSearchResult) => {
    onSelectLyrics({
      title: result.title,
      artist: result.artist,
      lyrics_fragment: result.lyrics_fragment,
    });
  };

  /**
   * Handler for when user clicks on title to copy only the title
   */
  const handleSelectTitle = (title: string) => {
    onSelectTitle(title);
  };

  /**
   * Handler for when user clicks on artist badge to copy only the artist
   */
  const handleSelectArtist = (artist: string) => {
    onSelectArtist(artist);
  };

  /**
   * Handler for when user clicks on lyrics area to copy only the lyrics
   */
  const handleSelectLyricsOnly = (lyrics: string) => {
    onSelectLyricsOnly(lyrics);
  };

  // Don't render anything if no title is provided
  if (!currentTitle) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Search Header with Loading Indicator */}
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">歌词搜索</span>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
          {error}
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            找到 {results.length} 个相关结果：
          </p>
          <div className="space-y-2">
            {results.map((result, index) => (
              <Card key={index} className="space-y-2">
                <CardHeader className="pb-2">
                  {/* Card Header with Music Icon and Instructions */}
                  <div className="flex items-center gap-2">
                    <Music className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">点击复制全部信息</span>
                  </div>
                  
                  {/* Clickable Title - Copies all song info */}
                  <CardTitle 
                    className="text-sm cursor-pointer hover:bg-accent/50 p-2 rounded transition-colors"
                    onClick={() => handleSelectLyrics(result)}
                  >
                    {result.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-2">
                  {/* Artist and Album Badges */}
                  <div className="flex gap-2">
                    {result.artist && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-secondary/80 transition-colors"
                        onClick={() => handleSelectArtist(result.artist)}
                      >
                        <User className="h-3 w-3 mr-1" />
                        {result.artist}
                      </Badge>
                    )}
                    {result.album && (
                      <Badge variant="outline" className="text-xs">
                        {result.album}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Clickable Lyrics Area - Copies only lyrics */}
                  <div 
                    className="text-xs text-muted-foreground p-2 bg-muted/30 rounded cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleSelectLyricsOnly(result.lyrics_fragment)}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <FileText className="h-3 w-3" />
                      <span className="text-xs">点击复制歌词</span>
                    </div>
                    <p className="line-clamp-3">
                      {result.lyrics_fragment}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && !error && results.length === 0 && currentTitle && (
        <div className="text-sm text-muted-foreground text-center py-4">
          未找到相关歌词
        </div>
      )}
    </div>
  );
} 