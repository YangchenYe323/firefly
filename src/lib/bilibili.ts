/**
 * This module contains our implementation of accessing the bilibili endpoint from nodejs server.
 */

import md5 from 'md5';

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
	param: GetVideoInfoArg,
): Promise<GetVideoInfoResponse> {
	const API_URL = "https://api.bilibili.com/x/web-interface/view";

	let url: string;
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

interface WbiKeys {
	img_key: string;
	sub_key: string;
}

export async function getBiliWebKeys(): Promise<WbiKeys> {
	const sessdata = process.env.BILI_CRED_SESSDATA;
	if (!sessdata) {
		throw new Error("BILI_CRED_SESSDATA is not set");
	}
	const wbiKeys = await getWbiKeys(sessdata);
	return wbiKeys;
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
	T,
	Exclude<keyof T, Keys>
> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
	}[Keys];

const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
  61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
  36, 20, 34, 44, 52
]

// 对 imgKey 和 subKey 进行字符顺序打乱编码
const getMixinKey = (orig: string) => mixinKeyEncTab.map(n => orig[n]).join('').slice(0, 32)

// 为请求参数进行 wbi 签名
function encWbi(params: Record<string, any>, img_key: string, sub_key: string) {
  const mixin_key = getMixinKey(`${img_key}${sub_key}`);
  const curr_time = Math.round(Date.now() / 1000);
  const chr_filter = /[!'()*]/g;

  Object.assign(params, { wts: curr_time }) // 添加 wts 字段
  // 按照 key 重排参数
  const query = Object
    .keys(params)
    .sort()
    .map(key => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chr_filter, '')
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  const wbi_sign = md5(query + mixin_key) // 计算 w_rid

  return `${query}&w_rid=${wbi_sign}`
}

// 获取最新的 img_key 和 sub_key
async function getWbiKeys(sessdata: string) {
  const res = await fetch('https://api.bilibili.com/x/web-interface/nav', {
    headers: {
      // SESSDATA 字段
      Cookie: `SESSDATA=${sessdata}`,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      Referer: 'https://www.bilibili.com/'//对于直接浏览器调用可能不适用
    }
  })
  const { data: { wbi_img: { img_url, sub_url } } } = await res.json()

  return {
    img_key: img_url.slice(
      img_url.lastIndexOf('/') + 1,
      img_url.lastIndexOf('.')
    ),
    sub_key: sub_url.slice(
      sub_url.lastIndexOf('/') + 1,
      sub_url.lastIndexOf('.')
    )
  }
}
