"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    $3Dmol?: any;
  }
}

function load3DMol(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.$3Dmol) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://3dmol.csb.pitt.edu/build/3Dmol-min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load 3Dmol.js"));
    document.head.appendChild(script);
  });
}

export function MolViewer({ pdbText }: { pdbText: string | null }) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let viewer: any | null = null;

    async function run() {
      setErr(null);
      const el = elRef.current;
      if (!el) return;
      if (!pdbText) return;

      try {
        await load3DMol();
        if (!window.$3Dmol) throw new Error("3Dmol not available");

        el.innerHTML = "";
        viewer = window.$3Dmol.createViewer(el, { backgroundColor: "white" });
        viewer.addModel(pdbText, "pdb");
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
        viewer.zoomTo();
        viewer.render();
      } catch (e: any) {
        setErr(e?.message ?? String(e));
      }
    }

    run();
    return () => {
      try {
        viewer?.clear();
      } catch {
        // ignore
      }
    };
  }, [pdbText]);

  return (
    <div className="w-full">
      <div className="rounded-md border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-900">
          Protein 3D (AlphaFold)
        </div>
        <div
          ref={elRef}
          className="h-[360px] w-full"
        />
        {!pdbText ? (
          <div className="px-3 pb-3 text-xs text-zinc-600">No structure available.</div>
        ) : null}
        {err ? (
          <div className="px-3 pb-3 text-xs text-red-600">{err}</div>
        ) : null}
      </div>
    </div>
  );
}
