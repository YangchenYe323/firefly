import fs from "fs";
import path from "path";

export interface VtuberExternalLink {
  value: string,
  icon?: string,
  href: string,
}

export interface VtuberProfile {
  name: string;
  bannerImagePath: string,
  avatarImagePath: string,
  backgroundImagePath?: string,
  externalLinks?: VtuberExternalLink[],
}

const VTUBER_PROFILE_PATH = "vtuber.profile.json";

const getVtuberProfileSingleton = () => {
  const profilePath = path.join(process.cwd(), VTUBER_PROFILE_PATH);
  const buf = fs.readFileSync(profilePath, "utf8");
  const profile: VtuberProfile = JSON.parse(buf);
  return profile;
}

declare global {
  var vtuberProfileGlobal: undefined | VtuberProfile;
}

const vtuberProfile = globalThis.vtuberProfileGlobal ?? getVtuberProfileSingleton();

export default vtuberProfile;

if (process.env.NODE_ENV !== "production") globalThis.vtuberProfileGlobal = vtuberProfile;
