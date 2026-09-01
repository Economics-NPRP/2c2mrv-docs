"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VOCABULARY } from "@/data";

/**
 * "Vocabulary" in the header navigation: the abbreviations and terms of art
 * used on the chart, explained in plain language.
 */
export default function VocabularyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
        Vocabulary
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[88vh] w-[min(760px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white shadow-2xl focus:outline-none">
          <div className="relative shrink-0 border-b border-gray-200 px-6 pb-4 pt-5">
            <Dialog.Title className="text-lg font-bold leading-snug text-gray-900">
              Vocabulary
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-[13px] italic leading-snug text-gray-600">
              The abbreviations and terms of art on the chart, in plain language.
            </Dialog.Description>
            <Dialog.Close
              aria-label="Close"
              className="absolute right-3.5 top-3.5 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-black/10 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-sky-600"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>

          <div className="grow overflow-y-auto px-6 py-4">
            {VOCABULARY.map((group, i) => (
              <section key={group.group} className={i > 0 ? "mt-6" : undefined}>
                <h3 className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  {group.group}
                </h3>
                {group.blurb && (
                  <p className="mb-3 text-[13px] italic leading-relaxed text-gray-600">
                    {group.blurb}
                  </p>
                )}
                <dl className="space-y-3">
                  {group.terms.map((t) => (
                    <div key={t.term}>
                      <dt className="text-[13.5px] font-semibold text-gray-900">
                        {t.term}
                        {t.expansion && (
                          <span className="ml-2 font-normal text-gray-500">
                            {t.expansion}
                          </span>
                        )}
                      </dt>
                      <dd className="mt-0.5 text-[13.5px] leading-relaxed text-gray-800">
                        {t.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
