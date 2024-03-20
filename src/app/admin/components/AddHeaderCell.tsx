"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MouseEventHandler, useState } from "react";

import { Button } from "@/components/ui/button";
import ChineseInput from "@/components/ChineseInput";
import { EditableSong } from "../page";
import { Label } from "@/components/ui/label";
import { Table } from "@tanstack/react-table";

interface PropType {
  table: Table<EditableSong>;
}

export default function AddHeaderCell({ table }: PropType) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [lang, setLang] = useState<string[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [remark, setRemark] = useState("");

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const newSong = {
      id: -1,
      title,
      artist,
      lang,
      tag,
      url,
      remark,
    };

    const _success = await table.options.meta?.insertData(newSong);
    if (_success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          添加歌曲 +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>又学会新歌啦，祝贺</DialogTitle>
          <DialogDescription>请填写歌曲信息</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              歌名
            </Label>
            <ChineseInput
              id="name"
              className="col-span-3"
              onValueChange={setTitle}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artist" className="text-right">
              歌手
            </Label>
            <ChineseInput
              id="artist"
              className="col-span-3"
              onValueChange={setArtist}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lang" className="text-right">
              语种
            </Label>
            <ChineseInput
              id="lang"
              placeholder="多个语种之间请用逗号隔开"
              className="col-span-3"
              onValueChange={(value) => setLang(value.split(","))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tag" className="text-right">
              标签
            </Label>
            <ChineseInput
              id="tag"
              placeholder="多个标签之间请用逗号隔开"
              className="col-span-3"
              onValueChange={(value) => setTag(value.split(","))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              作品链接
            </Label>
            <ChineseInput
              id="url"
              placeholder="还没唱吗？那就空着吧..."
              className="col-span-3"
              onValueChange={(value) => setUrl(value || null)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="remark" className="text-right">
              备注
            </Label>
            <ChineseInput
              id="remark"
              className="col-span-3"
              onValueChange={setRemark}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
