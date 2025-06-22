# firefly

蝶蝶的歌单网站，希望dd和主包们玩得开心~

本仓库部署的是B站虚拟主播 *蝶蝶Hikari* 的个人歌单(您可以在 https://www.diehikari.top/ 访问)。

This project is heavily based on the work of [@贝格耶喽](https://github.com/BigYellowhcy) and inspired by sites like https://shulisuki.top/ and https://www.taojiovo.com/

# Features

- [x] 复制歌曲到剪贴板
- [x] 根据标签选择歌曲
- [x] 搜索歌曲
- [x] 随机点歌
- [x] 乱序歌曲
- [x] 点❤️/😅
- [x] 歌曲管理后台
- [x] 投稿播放器

## Getting Started

#### Clone the repo

```bash
git clone https://github.com/YangchenYe323/firefly.git && cd firefly
```

#### Install dependencies

This project is developed with [pnpm](https://pnpm.io/) and is not tested on other package managers.

```bash
pnpm install
```

#### Set up database

This project uses [PostgreSQL](https://www.postgresql.org/) as the database. It needs a running Postgres server to run. There are two ways you could set the server up:

1. [15 Minutes and some headache] Set up a local Postgres instance: https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database

2. [2 Minutes] Use a free managed Postgres service like [Neon Database](https://neon.tech/). **This is the recommended approach as setting up Postgres locally is still tedious.** The author develops and deploys the project using Neon.

After the database is up, add a `.env` file in the project root directory containing the database URL and a secret key of your choice:

- If you are using a local Postgres instance:
```
# firefly/.env
POSTGRES_PRISMA_URL="postgresql://postgres:<your password>@localhost:<your postgres port (default 5432)>/postgres"
NEXT_PUBLIC_JWT_SECRET_KEY=<Choose your secret>
NEXT_PUBLIC_API_URL=http://localhost:8787
```
- If you are using Neon:
```
# firefly/.env
POSTGRES_PRISMA_URL="<copy the URL from your neon console>"
NEXT_PUBLIC_JWT_SECRET_KEY=<Choose your secret>
NEXT_PUBLIC_API_URL=http://localhost:8787
```

#### Album Artwork Fetching (Cloudflare Worker API)

This project uses a serverless API to fetch album artwork for each song. The API endpoint is configured via the `NEXT_PUBLIC_API_URL` environment variable. The frontend will use this endpoint to display album covers for each song in the list.

**To run the API locally for development:**

- Please refer to [firefly-api](https://github.com/YangchenYe323/firefly-api) for instructions on starting a local instance of the API service (Cloudflare Worker).
- Set the `NEXT_PUBLIC_API_URL` environment variable in your `.env` file to the local API endpoint (e.g. `http://localhost:8787`).

Example `.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:8787
```

#### Configure database

This project uses [Prisma-ORM](https://www.prisma.io/), and after the database is up, the configuration is as easy as running
```Bash
pnpm prisma db push
```

#### Start development server
```Bash
pnpm dev
```

Now you're good to go!

