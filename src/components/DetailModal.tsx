"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { TONES, type ContentEntry, type Tone } from "@/data";

interface DetailModalProps {
  entry: (ContentEntry & { tone: Tone }) | null;
  onClose: () => void;
}

export default function DetailModal({ entry, onClose }: DetailModalProps) {
  const tone = entry ? TONES[entry.tone] : null;

  return (
    <Dialog.Root open={entry !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 flex max-h-[86vh] w-[min(680px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white shadow-2xl focus:outline-none"
          aria-describedby={entry?.tagline ? undefined : ""}
        >
          {entry && tone && (
            <>
              {/* Header, tinted with the node's diagram color */}
              <div
                className="shrink-0 border-b px-6 pb-4 pt-5"
                style={{
                  background: entry.tone === "retired" ? "#f4f4f5" : tone.fill,
                  borderColor: entry.tone === "retired" ? "#d4d4d8" : tone.stroke,
                }}
              >
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                  {entry.stage && (
                    <span
                      className="rounded-md border bg-white/85 px-1.5 py-0.5 font-mono text-[11px] font-bold"
                      style={{ borderColor: tone.stroke, color: "#1f2937" }}
                    >
                      {entry.stage}
                    </span>
                  )}
                  {entry.actorLabel && (
                    <span
                      className="rounded-md border bg-white/60 px-1.5 py-0.5 text-[11px] font-medium text-gray-700"
                      style={{ borderColor: tone.stroke }}
                    >
                      {entry.actorLabel}
                    </span>
                  )}
                </div>
                <Dialog.Title className="text-lg font-bold leading-snug text-gray-900">
                  {entry.title}
                </Dialog.Title>
                {entry.tagline && (
                  <Dialog.Description className="mt-1 text-[13px] italic leading-snug text-gray-600">
                    {entry.tagline}
                  </Dialog.Description>
                )}
                <Dialog.Close
                  aria-label="Close"
                  className="absolute right-3.5 top-3.5 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-black/10 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-sky-600"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </Dialog.Close>
              </div>

              {/* Body */}
              <div className="grow overflow-y-auto px-6 py-4">
                {entry.sections.map((section, i) => (
                  <section key={i} className={i > 0 ? "mt-4" : undefined}>
                    {section.heading && (
                      <h3 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        {section.heading}
                      </h3>
                    )}
                    {section.paras?.map((p, j) => (
                      <p key={j} className="mt-1.5 text-[13.5px] leading-relaxed text-gray-800 first:mt-0">
                        {p}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-[13.5px] leading-relaxed text-gray-800 marker:text-gray-400">
                        {section.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
