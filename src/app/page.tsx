import FlowCanvas from "@/components/FlowCanvas";
import VocabularyDialog from "@/components/VocabularyDialog";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
        <h1 className="text-sm font-bold tracking-tight text-gray-900">
          2C2MRV{" "}
          <span className="font-normal text-gray-500">— Business flow</span>
        </h1>
        <div className="flex items-center gap-4">
          <p className="hidden text-xs text-gray-500 md:block">
            Click any element for details · scroll to zoom, drag to pan
          </p>
          <VocabularyDialog />
        </div>
      </header>
      <div className="min-h-0 flex-1">
        <FlowCanvas />
      </div>
    </main>
  );
}
