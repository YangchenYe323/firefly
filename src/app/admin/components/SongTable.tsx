"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink, Music } from "lucide-react";
import type { EditableSong } from "../page";

interface SongTableProps {
  songs: EditableSong[];
  onEditSong: (song: EditableSong) => void;
  onDeleteSong: (song: EditableSong) => void;
  isLoading: boolean;
}

export default function SongTable({
  songs,
  onEditSong,
  onDeleteSong,
  isLoading,
}: SongTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        没有找到歌曲
      </div>
    );
  }

  return (
    <div className="overflow-auto h-full">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead className="min-w-[200px]">歌曲名</TableHead>
            {/* Desktop-only columns */}
            <TableHead className="min-w-[150px] hidden md:table-cell">歌手</TableHead>
            <TableHead className="min-w-[100px] hidden md:table-cell">语种</TableHead>
            <TableHead className="min-w-[120px] hidden md:table-cell">标签</TableHead>
            <TableHead className="min-w-[100px] hidden md:table-cell">链接</TableHead>
            <TableHead className="min-w-[100px] hidden md:table-cell">备注</TableHead>
            <TableHead className="w-20">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow
              key={song.id}
              className="hover:bg-muted/50 transition-colors"
              onMouseEnter={() => setHoveredRow(song.id!)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <TableCell className="font-mono text-sm">
                {song.id}
              </TableCell>
              
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {song.bucket_url && (
                    <Music className="w-4 h-4 text-blue-500" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate" title={song.title}>
                      {song.title}
                    </div>
                    {/* Show artist on mobile as subtitle */}
                    <div className="text-sm text-muted-foreground truncate md:hidden" title={song.artist}>
                      {song.artist}
                    </div>
                  </div>
                </div>
              </TableCell>
              
              {/* Desktop-only cells */}
              <TableCell className="hidden md:table-cell">
                <span className="truncate max-w-[130px] block" title={song.artist}>
                  {song.artist}
                </span>
              </TableCell>
              
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {song.lang.slice(0, 2).map((lang, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                  {song.lang.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{song.lang.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {song.tag.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {song.tag.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{song.tag.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="hidden md:table-cell">
                {song.url ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(song.url!, '_blank')}
                    className="h-6 px-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              
              <TableCell className="hidden md:table-cell">
                <span 
                  className="truncate max-w-[80px] block text-sm text-muted-foreground"
                  title={song.remark}
                >
                  {song.remark || "-"}
                </span>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditSong(song)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSong(song)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 