/**
 * This module contains our implementation of accessing the bilibili endpoint from nodejs server.
 */

const USER_AGENT =
  "Mozilla/5.0 BiliDroid/6.73.1 (bbcallen@gmail.com) os/android model/Mi 10 Pro mobi_app/android build/6731100 channel/xiaomi innerVer/6731110 osVer/12 network/2";

/**
 * [`Credential`] represents a user cookie
 */
export interface Credential {
  sessdata: string;
  bilijct: string;
  dedeuserid: string;
}

export interface GetVideoInfoInner {
  bvid?: string;
  aid?: number;
}

export type GetVideoInfoArg = RequireAtLeastOne<
  GetVideoInfoInner,
  "bvid" | "aid"
>;

export interface GetVideoInfoResponse {
  code: number;
  message: string;
  ttl: number;
  data?: GetVideoInfoData;
}

export interface GetVideoInfoData {
  bvid: string;
  aid: number;
  videos: number;
  tid: number;
  tname: string;
  copyright: number;
  pic: string;
  title: string;
  pubdate: number;
  ctime: number;
  desc: string;
  desc_v2: DescV2[];
  state: number;
  attribute?: number;
  duration: number;
  forward?: number;
  mission_id?: number;
  redirect_url?: string;
  rights: Rights;
  owner: Owner;
  stat: Stat;
  dynamic: string;
  cid: number;
  dimension: Dimension;
  premiere?: null;
  teenage_mode?: number;
  is_chargeable_season?: boolean;
  is_story?: boolean;
  no_cache?: boolean;
  pages: Page[];
  subtitle: Subtitle;
  staff?: Staff[];
  is_season_display?: boolean;
  user_garb?: UserGarb;
  honor_reply?: HonorReply;
  like_icon?: string;
  argue_info?: ArgueInfo;
}

export interface DescV2 {
  raw_text: string;
  type: number;
  biz_id: number;
}

export interface Rights {
  bp: number;
  elec: number;
  download: number;
  movie: number;
  pay: number;
  hd5: number;
  no_reprint: number;
  autoplay: number;
  ugc_pay: number;
  is_cooperation: number;
  ugc_pay_preview: number;
  no_background: number;
  clean_mode: number;
  is_stein_gate: number;
  is_360: number;
  no_share: number;
  arc_pay: number;
  free_watch: number;
}

export interface Owner {
  mid: number;
  name: string;
  face: string;
}

export interface Stat {
  aid: number;
  view: number;
  danmaku: number;
  reply: number;
  favorite: number;
  coin: number;
  share: number;
  now_rank: number;
  his_rank: number;
  like: number;
  dislike: number;
  evaluation: string;
  vt: number;
}

export interface Page {
  cid: number;
  page: number;
  from: string;
  part: string;
  duration: number;
  vid?: string;
  weblink?: string;
  dimension: Dimension;
}

export interface Dimension {
  width: number;
  height: number;
  rotate: number;
}

export interface Subtitle {
  allow_submit: boolean;
  list: SubtitleList[];
}

export interface SubtitleList {
  id: number;
  lan: string;
  lan_doc: string;
  is_lock: boolean;
  author_mid: number;
  subtitle_url: string;
  author: SubtitleAuthor;
}

export interface SubtitleAuthor {
  mid: number;
  name: string;
  sex: string;
  face: string;
  sign: string;
  rank: number;
  birthday: number;
  is_fake_account: number;
  is_deleted: number;
}

export interface Staff {
  mid: number;
  title: string;
  name: string;
  face: string;
  vip: StaffVip;
  official: StaffOfficial;
  follower: number;
  label_style: number;
}

export interface StaffVip {
  type: number;
  status: number;
  theme_type: number;
}

export interface StaffOfficial {
  role: number;
  title: string;
  desc: string;
  type: number;
}

export interface UserGarb {
  url_image_ani_cut: string;
}

export interface HonorReply {
  honor: Honor[];
}

export interface Honor {
  aid: number;
  type: number;
  desc: number;
  weekly_recommend_num: number;
}

export interface ArgueInfo {
  argue_link: string;
  argue_msg: string;
  argue_type: number;
}

export async function getVideoInfo(
  param: GetVideoInfoArg
): Promise<GetVideoInfoResponse> {
  const API_URL = "https://api.bilibili.com/x/web-interface/view";

  let url;
  if (param.bvid) {
    url = `${API_URL}?bvid=${param.bvid}`;
  } else {
    url = `${API_URL}?aid=${param.aid}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": USER_AGENT,
    },
  });
  const body = await response.json();
  return body;
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
