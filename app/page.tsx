"use client";

import { useState } from "react";
import { MoleculeCard } from "../components/MoleculeCard";
import { ProteinCard } from "../components/ProteinCard";
import { SearchBar } from "../components/SearchBar";

type AnalyzeResponse = {
  disease: string;
  results: Array<{
    protein: any;
    alphafold_pdb: string | null;
    molecules: any[];
  }>;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyzeResponse | null>(null);

  async function onSearch(disease: string) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disease, max_proteins: 5, molecules_per_protein: 30 }),
      });

      const j = await r.json();
      if (!r.ok) {
        throw new Error(j?.detail ?? j?.error ?? "Request failed");
      }
      setData(j);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-900">Drug Target Analyzer</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Enter a disease name to fetch UniProt targets, AlphaFold structures, and candidate molecules.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <SearchBar initialDisease="Malaria" onSearch={onSearch} loading={loading} />
          {error ? <div className="mt-4 text-sm text-red-600">{error}</div> : null}
        </div>

        {data ? (
          <div className="mt-8 flex flex-col gap-8">
            {data.results.map((r, idx) => (
              <div key={`${r?.protein?.uniprot_id ?? idx}`} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ProteinCard protein={r.protein} pdbText={r.alphafold_pdb} />
                <div className="w-full rounded-lg border border-zinc-200 bg-white overflow-hidden">
                  <div className="p-4 border-b border-zinc-200">
                    <div className="text-sm font-semibold text-zinc-900">Matching molecules</div>
                    <div className="mt-1 text-xs text-zinc-600">
                      Showing {r.molecules?.length ?? 0} filtered candidates
                    </div>
                    {r?.protein?.molmim_error ? (
                      <div className="mt-2 text-xs text-red-600">MolMIM error: {r.protein.molmim_error}</div>
                    ) : null}
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-auto">
                    {(r.molecules ?? []).map((m, mi) => (
                      <MoleculeCard key={mi} molecule={m} />
                    ))}
                    {(r.molecules ?? []).length === 0 ? (
                      <div className="text-sm text-zinc-600">No molecules passed the filter.</div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
