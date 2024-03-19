import Image from "next/image";
import vtuberProfile from "@/profile";

interface PropType {
  songCount: number;
}

export default async function Heading({ songCount }: PropType) {
  const { name, bannerImagePath, backgroundImagePath } = vtuberProfile;

  return (
    <div className="w-full text-center my-6">
      <span className="inline-block overflow-hidden border-0 mx-0 mb-4 p-0">
        <Image
          src={bannerImagePath}
          alt={name}
          width={240}
          height={240}
          className="rounded-full border border-black"
        />
      </span>
      <h1 className="text-center text-4xl md:text-5xl lg:text-6xl text-black font-light">
        {name}
      </h1>
      <h1 className="pt-4 text-center text-3xl md:text-4xl lg:text-5xl text-black font-light">
        和她<del>不一定</del>拿手的
        <span className="italic font-light mx-1">{songCount}</span>
        首歌
      </h1>
      <p className="pt-6 pb-4 text-center text-black font-light">
        可以点击歌名复制哦
      </p>
    </div>
  );
}
