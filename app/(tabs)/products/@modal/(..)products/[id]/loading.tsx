import CloseButton from '@/components/close-button';

import { PhotoIcon } from '@heroicons/react/24/solid';
export default function Loading() {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
      <CloseButton />
      <div className="w-full max-w-screen-sm overflow-hidden rounded-md bg-neutral-900">
        <div className="flex animate-pulse flex-col p-5">
          <div className="flex aspect-square items-center justify-center rounded-md border-4 border-dashed border-neutral-700 text-neutral-700">
            <PhotoIcon className="h-28" />
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-3 border-b border-neutral-700 py-3">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-full bg-neutral-700" />
                <div className="h-5 w-40 rounded-md bg-neutral-700" />
              </div>
            </div>
            <div className="h-5 w-80 rounded-md bg-neutral-700" />
          </div>
        </div>
        <div className="flex w-full items-center justify-between bg-neutral-800 p-5">
          <span className="text-xl font-semibold">
            <div className="h-5 w-20 rounded-md bg-neutral-700" />
          </span>
          <div className="flex gap-x-5">
            <div className="rounded-md bg-neutral-500 px-5 py-2.5 font-semibold text-white">
              <div className="h-5 w-16 rounded-md bg-neutral-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
