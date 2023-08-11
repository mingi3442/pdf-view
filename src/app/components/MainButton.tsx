"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainButton() {
  const router = useRouter();
  const onClickTestButton = () => {
    return router.push("./test");
  };
  const onClickPdfTestButton = () => {
    return router.push("./pdf-test");
  };
  return (
    <>
      <div
        onClick={onClickTestButton}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Test <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
      </div>
      <div
        onClick={onClickPdfTestButton}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          PDF Test <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
      </div>
    </>
  );
}
