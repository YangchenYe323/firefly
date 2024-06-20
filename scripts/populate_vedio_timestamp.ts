/**
 * This script is used for migrating to the vedio timestamp feature. It essentially
 * reads all the songs in the database, and try to populate the extra.vedio_created_on field from
 * the url field. It does so by extracting the BV number from the url and make a query, using the same
 * mechanism as the backend does after the feature is implemented.
 */

import prisma from "@/db";
import { queryVedioCreationTimestampFromUrl } from "@/lib/utils";

async function main() {
  const songs = await prisma.song.findMany();
  for (const song of songs) {
    if (song.url !== null) {
      const vedio_created_on = await queryVedioCreationTimestampFromUrl(
        song.url
      );
      if (
        vedio_created_on !== null &&
        vedio_created_on !== (song.extra! as object).vedio_created_on
      ) {
        await prisma.song.update({
          where: {
            id: song.id,
          },
          data: {
            extra: {
              ...(song.extra as object),
              vedio_created_on,
            },
          },
        });

        console.log(`${song.title} -> ${vedio_created_on}`);
      }
    }
  }
}

main();
