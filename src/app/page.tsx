import FlowCanvas from "@/components/FlowCanvas";

export default function Home() {
  return (
    <main className="flex h-dvh flex-col">
      <header className="flex shrink-0 items-baseline justify-between gap-4 border-b border-gray-200 bg-white px-4 py-2.5 sm:px-6">
        <h1 className="text-sm font-bold tracking-tight text-gray-900">
          2C2MRV{" "}
          <span className="font-normal text-gray-500">— Business flow</span>
        </h1>
        <p className="hidden text-xs text-gray-500 sm:block">
          Click any element for the PRD detail behind it · scroll to zoom, drag to pan
        </p>
      </header>
      <div className="min-h-0 flex-1">
        <FlowCanvas />
      </div>
    </main>
  );
}
