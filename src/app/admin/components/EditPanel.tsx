"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Save, Trash2 } from "lucide-react";
import type { EditableSong } from "../page";

interface EditPanelProps {
  song: EditableSong;
  onSave: (song: EditableSong) => void;
  onCancel: () => void;
  isLoading: boolean;
  isCreating: boolean;
}

export default function EditPanel({
  song,
  onSave,
  onCancel,
  isLoading,
  isCreating,
}: EditPanelProps) {
  const [formData, setFormData] = useState<EditableSong>(song);
  const [langInput, setLangInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setFormData(song);
  }, [song]);

  const handleInputChange = (field: keyof EditableSong, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addLanguage = () => {
    const trimmedLang = langInput.trim();
    if (trimmedLang && !formData.lang.includes(trimmedLang)) {
      setFormData((prev) => ({
        ...prev,
        lang: [...prev.lang, trimmedLang],
      }));
      setLangInput("");
    }
  };

  const removeLanguage = (langToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      lang: prev.lang.filter((lang) => lang !== langToRemove),
    }));
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tag.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tag: [...prev.tag, trimmedTag],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tag: prev.tag.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">歌曲名 *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="输入歌曲名"
            required
            className="text-base"
          />
        </div>

        {/* Artist */}
        <div className="space-y-2">
          <Label htmlFor="artist">歌手 *</Label>
          <Input
            id="artist"
            value={formData.artist}
            onChange={(e) => handleInputChange("artist", e.target.value)}
            placeholder="输入歌手名"
            required
            className="text-base"
          />
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <Label>语种</Label>
          <div className="flex gap-2">
            <Input
              value={langInput}
              onChange={(e) => setLangInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, addLanguage)}
              placeholder="添加语种"
              className="flex-1 text-base"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLanguage}
              className="px-3"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.lang.map((lang, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {lang}
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className="ml-1 hover:text-destructive p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>标签</Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, addTag)}
              placeholder="添加标签"
              className="flex-1 text-base"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTag}
              className="px-3"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.tag.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-destructive p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* URL */}
        <div className="space-y-2">
          <Label htmlFor="url">作品链接</Label>
          <Input
            id="url"
            type="url"
            value={formData.url || ""}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="https://www.bilibili.com/video/..."
            className="text-base"
          />
        </div>

        {/* Bucket URL */}
        <div className="space-y-2">
          <Label htmlFor="bucket_url">音频文件链接</Label>
          <Input
            id="bucket_url"
            type="url"
            value={formData.bucket_url}
            onChange={(e) => handleInputChange("bucket_url", e.target.value)}
            placeholder="https://example.com/audio.mp3"
            className="text-base"
          />
        </div>

        {/* Remark */}
        <div className="space-y-2">
          <Label htmlFor="remark">备注</Label>
          <Textarea
            id="remark"
            value={formData.remark}
            onChange={(e) => handleInputChange("remark", e.target.value)}
            placeholder="添加备注信息"
            rows={3}
            className="text-base resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t flex-shrink-0">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-12 text-base"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              {isCreating ? "创建" : "保存"}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="h-12 px-6 text-base"
        >
          取消
        </Button>
      </div>
    </form>
  );
} 