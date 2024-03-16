import SongList from "@/components/SongList";

export default async function Home() {
  return (
    <div className="flex flex-col justify-center">
      <SongList />;
    </div>
  );
}
