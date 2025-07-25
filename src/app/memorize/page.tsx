import { Header } from "@/components/quran-memorizer/header";
import { MemorizeView } from "@/components/quran-memorizer/memorize-view";

export default function MemorizePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <MemorizeView />
      </main>
    </div>
  );
}
