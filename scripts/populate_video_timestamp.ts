/**
 * This script is used for migrating to the vedio timestamp feature. It essentially
 * reads all the songs in the database, and try to populate the extra.video_created_on field from
 * the url field. It does so by extracting the BV number from the url and make a query, using the same
 * mechanism as the backend does after the feature is implemented.
 */

import { extractBvidFromUrl } from "@/lib/utils";
import { getVideoInfo } from "@/lib/bilibili";
import prisma from "@/db";

async function main() {
  const songs = await prisma.song.findMany();
  for (const song of songs) {
    if (song.url !== null) {
      const bvid = extractBvidFromUrl(song.url);
      if (bvid !== null) {
        const response = await getVideoInfo({ bvid });
        if (response.data) {
          await prisma.song.update({
            where: {
              id: song.id,
            },
            data: {
              extra: {
                ...(song.extra as object),
                video_created_on: new Date(response.data.pubdate * 1000),
              },
            },
          });
          console.log(
            `成功更新 ${song.title} -> ${new Date(
              response.data.pubdate * 1000
            )}`
          );
        } else {
          console.error(
            `获取投稿 ${bvid} 失败: ${response.code} ${response.message}`
          );
        }
      } else {
        console.log(`歌曲 ${song.title} 投稿链接 ${song.url} 无法获取BV号`);
      }
    }
  }
}

main();
