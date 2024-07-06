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
import { KeyboardEventHandler, MouseEventHandler, useState } from "react";

import { Button } from "@/components/ui/button";
import ChineseInput from "@/components/ChineseInput";
import { EditableSong } from "../page";
import { Label } from "@/components/ui/label";
import { Table } from "@tanstack/react-table";

interface PropType {
  table: Table<EditableSong>;
}

interface ListState {
  values: string[];
  inputValue: string | null;
}

interface AddSongDraftState {
  dialogOpen: boolean;
  title: string;
  artist: string;
  lang: ListState;
  tag: ListState;
  url: string | null;
  remark: string;
}

const getEmptyState = (): AddSongDraftState => ({
  dialogOpen: false,
  title: "",
  artist: "",
  lang: {
    values: [],
    inputValue: null,
  },
  tag: {
    values: [],
    inputValue: null,
  },
  url: null,
  remark: "",
});

export default function AddHeaderCell({ table }: PropType) {
  const [addSongState, setAddSongState] = useState(getEmptyState());

  const onDialogOpenChange = (open: boolean) => {
    setAddSongState((oldState) => ({
      ...oldState,
      dialogOpen: open,
    }));
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const newSong = {
      id: -1,
      title: addSongState.title,
      artist: addSongState.artist,
      lang: addSongState.lang.values,
      tag: addSongState.tag.values,
      url: addSongState.url,
      remark: addSongState.remark,
      bucket_url: "",
    };

    const _success = await table.options.meta?.insertData(newSong);
    if (_success) {
      setAddSongState(getEmptyState());
    }
  };

  const onTagButtonClick = () =>
    setAddSongState((oldState) => ({
      ...oldState,
      tag: {
        ...oldState.tag,
        inputValue: "",
      },
    }));

  const onTagValueChange = (value: string) =>
    setAddSongState((oldState) => ({
      ...oldState,
      tag: {
        ...oldState.tag,
        inputValue: value,
      },
    }));

  const onTagInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && addSongState.tag.inputValue) {
      setAddSongState((oldState) => {
        const newValues =
          !oldState.tag.inputValue ||
          oldState.tag.values.find(
            (val) =>
              val.toLowerCase() === oldState.tag.inputValue!.toLowerCase()
          )
            ? [...oldState.tag.values]
            : [...oldState.tag.values, oldState.tag.inputValue];

        return {
          ...oldState,
          tag: {
            values: newValues,
            inputValue: null,
          },
        };
      });
    }
  };

  const onTagRemoveEntry = (idx: number) => {
    const newEntries = [...addSongState.tag.values];
    newEntries.splice(idx, 1);
    setAddSongState((oldState) => ({
      ...oldState,
      tag: {
        ...oldState.tag,
        values: newEntries,
      },
    }));
  };

  const onLangButtonClick = () =>
    setAddSongState((oldState) => ({
      ...oldState,
      lang: {
        ...oldState.lang,
        inputValue: "",
      },
    }));

  const onLangValueChange = (value: string) =>
    setAddSongState((oldState) => ({
      ...oldState,
      lang: {
        ...oldState.lang,
        inputValue: value,
      },
    }));

  const onLangInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && addSongState.lang.inputValue) {
      setAddSongState((oldState) => {
        const newValues =
          !oldState.lang.inputValue ||
          oldState.lang.values.find(
            (val) =>
              val.toLowerCase() === oldState.lang.inputValue!.toLowerCase()
          )
            ? [...oldState.lang.values]
            : [...oldState.lang.values, oldState.lang.inputValue];

        return {
          ...oldState,
          lang: {
            values: newValues,
            inputValue: null,
          },
        };
      });
    }
  };

  const onLangRemoveEntry = (idx: number) => {
    const newEntries = [...addSongState.lang.values];
    newEntries.splice(idx, 1);
    setAddSongState((oldState) => ({
      ...oldState,
      lang: {
        ...oldState.lang,
        values: newEntries,
      },
    }));
  };

  const setTitle = (value: string) => {
    setAddSongState((oldState) => ({ ...oldState, title: value }));
  };

  const setArtist = (value: string) => {
    setAddSongState((oldState) => ({ ...oldState, artist: value }));
  };

  const setRemark = (value: string) => {
    setAddSongState((oldState) => ({ ...oldState, remark: value }));
  };

  const setUrl = (value: string | null) => {
    setAddSongState((oldState) => ({ ...oldState, url: value }));
  };

  return (
    <Dialog open={addSongState.dialogOpen} onOpenChange={onDialogOpenChange}>
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
            <ul className="inline-flex flex-wrap justify-start items-center w-full col-span-3">
              {addSongState.lang.values.map((val, index) => (
                <li
                  key={val}
                  className="flex items-center rounded bg-white text-black border mr-2 whitespace-nowrap p-0.5"
                >
                  {val}
                  <Button
                    variant="outline"
                    className="inline-flex justify-center items-center w-[15px] h-[15px] rounded-full p-0"
                    onClick={() => onLangRemoveEntry(index)}
                  >
                    ×
                  </Button>
                </li>
              ))}
              <Button variant="outline" size="sm" onClick={onLangButtonClick}>
                +
              </Button>
              {addSongState.lang.inputValue !== null && (
                <ChineseInput
                  className="grow shrink animate-slide-right"
                  placeholder="回车完成编辑"
                  onValueChange={onLangValueChange}
                  onKeyDown={onLangInputKeyDown}
                />
              )}
            </ul>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tag" className="text-right">
              标签
            </Label>
            <ul className="inline-flex flex-wrap justify-start items-center w-full col-span-3">
              {addSongState.tag.values.map((val, index) => (
                <li
                  key={val}
                  className="flex items-center rounded bg-white text-black border mr-2 whitespace-nowrap p-0.5"
                >
                  {val}
                  <Button
                    variant="outline"
                    className="inline-flex justify-center items-center w-[15px] h-[15px] rounded-full p-0"
                    onClick={() => onTagRemoveEntry(index)}
                  >
                    ×
                  </Button>
                </li>
              ))}
              <Button variant="outline" size="sm" onClick={onTagButtonClick}>
                +
              </Button>
              {addSongState.tag.inputValue !== null && (
                <ChineseInput
                  className="grow shrink animate-slide-right"
                  placeholder="回车完成编辑"
                  onValueChange={onTagValueChange}
                  onKeyDown={onTagInputKeyDown}
                />
              )}
            </ul>
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
