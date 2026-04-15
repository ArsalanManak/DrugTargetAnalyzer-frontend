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
  const [view, setView] = useState<"home" | "explore">("home");
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

  if (view === "home") {
    return (
      <div className="min-h-screen bg-black text-white font-sans selection:bg-[#76b900] selection:text-black">
        {/* Header */}
        <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#76b900] rounded-sm flex items-center justify-center font-bold text-black text-xl">D</div>
              <span className="text-lg font-bold tracking-tight">DRUG<span className="text-[#76b900]">TARGET</span> ANALYZER</span>
            </div>
            <button 
              onClick={() => setView("explore")}
              className="bg-[#76b900] text-black px-5 py-2 rounded-sm text-sm font-bold hover:bg-[#86d600] transition-all"
            >
              EXPLORE HERE
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main>
          <section className="relative py-24 overflow-hidden border-b border-zinc-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black -z-10"></div>
            <div className="mx-auto max-w-5xl px-6 text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                Accelerating Drug Discovery <br/> with Generative AI
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                An end-to-end computational pipeline integrating UniProt databases, AlphaFold protein structures, 
                and NVIDIA MolMIM generative models to identify and optimize potential drug candidates.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => setView("explore")}
                  className="w-full sm:w-auto bg-[#76b900] text-black px-8 py-4 rounded-sm text-base font-bold hover:scale-105 transition-transform"
                >
                  START ANALYSIS
                </button>
              </div>
            </div>
          </section>

          {/* Technical Details for Chemists */}
          <section className="py-24 bg-black">
            <div className="mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <div className="text-[#76b900] font-mono text-sm uppercase tracking-widest">01. Target Identification</div>
                  <h3 className="text-2xl font-bold">UniProt Integration</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Automatically queries reviewed human protein targets associated with specific disease phenotypes. 
                    Retrieves critical metadata including gene names, primary accessions, and organism specificity.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#76b900] font-mono text-sm uppercase tracking-widest">02. Structural Modeling</div>
                  <h3 className="text-2xl font-bold">AlphaFold 3D Structures</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Fetches high-confidence predicted protein structures from the AlphaFold Database (EBI). 
                    Provides real-time 3D visualization using GL-accelerated rendering for molecular surface analysis.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-[#76b900] font-mono text-sm uppercase tracking-widest">03. De Novo Generation</div>
                  <h3 className="text-2xl font-bold">NVIDIA MolMIM (NIM)</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Leverages NVIDIA's Molecular Molecule Interactive Model (MolMIM) to generate novel SMILES strings. 
                    Uses CMA-ES sampling to optimize for Quantitative Estimate of Drug-likeness (QED).
                  </p>
                </div>
              </div>

              <div className="mt-24 p-8 bg-zinc-900/30 border border-zinc-800 rounded-sm">
                <h4 className="text-[#76b900] font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#76b900] rounded-full animate-pulse"></span>
                  CHEMICAL VALIDATION ENGINE
                </h4>
                <p className="text-zinc-300 text-sm mb-6 max-w-4xl">
                  Every generated candidate undergoes rigorous RDKit-based heuristic filtering. We calculate Lipinski parameters 
                  (Molecular Weight, LogP, H-Bond Donors/Acceptors) and Topological Polar Surface Area (tPSA) to ensure drug-likeness.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="bg-black/50 p-3 border border-zinc-800">MW: 150 - 500 Da</div>
                  <div className="bg-black/50 p-3 border border-zinc-800">LogP: &lt; 5.0</div>
                  <div className="bg-black/50 p-3 border border-zinc-800">HBD: &lt; 5</div>
                  <div className="bg-black/50 p-3 border border-zinc-800">QED Score: &gt; 0.3</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-12 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p> 2024 Drug Target Analyzer | Powered by NVIDIA BioNeMo & AlphaFold DB</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#76b900] selection:text-black">
      {/* Navbar */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <button onClick={() => setView("home")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-zinc-800 group-hover:bg-[#76b900] rounded-sm flex items-center justify-center font-bold text-white group-hover:text-black transition-colors text-xl">D</div>
            <span className="text-lg font-bold tracking-tight">DRUG<span className="text-[#76b900]">TARGET</span></span>
          </button>
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
            Status: <span className="text-[#76b900]">Live Node</span>
          </div>
          <button 
            onClick={() => setView("home")}
            className="text-sm font-bold text-zinc-400 hover:text-white underline decoration-[#76b900] underline-offset-4"
          >
            Back to Overview
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 bg-zinc-900/50 border-l-4 border-[#76b900] p-6 rounded-r-sm">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">Analysis Console</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Select a target disease to initiate the molecular discovery pipeline.
          </p>
        </div>

        <div className="rounded-sm border border-zinc-800 bg-zinc-900/20 p-6 mb-10">
          <SearchBar initialDisease="Malaria" onSearch={onSearch} loading={loading} />
          {error ? <div className="mt-4 p-3 bg-red-900/20 border border-red-900 text-xs text-red-400 rounded-sm font-mono">{error}</div> : null}
        </div>

        {data ? (
          <div className="flex flex-col gap-12">
            {data.results.map((r, idx) => (
              <div key={`${r?.protein?.uniprot_id ?? idx}`} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left: Protein Column */}
                <div className="lg:col-span-5">
                  <ProteinCard protein={r.protein} pdbText={r.alphafold_pdb} />
                </div>
                
                {/* Right: Molecules Column */}
                <div className="lg:col-span-7 flex flex-col h-full bg-zinc-900/30 border border-zinc-800 rounded-sm overflow-hidden">
                  <div className="p-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black tracking-widest uppercase">Candidate Library</div>
                      <div className="mt-1 text-[10px] font-mono text-[#76b900]">
                        Retrieved {r.molecules?.length ?? 0} molecular samples
                      </div>
                    </div>
                    {r?.protein?.molmim_error && (
                      <div className="text-[10px] bg-red-900/40 text-red-400 px-2 py-1 rounded-sm border border-red-800 animate-pulse">
                        ERROR: MOLMIM_API_FAIL
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {(r.molecules ?? []).map((m, mi) => (
                      <MoleculeCard key={mi} molecule={m} />
                    ))}
                    {(r.molecules ?? []).length === 0 && !r?.protein?.molmim_error && (
                      <div className="col-span-full py-20 text-center">
                        <div className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em]">No candidates passed threshold</div>
                      </div>
                    )}
                    {r?.protein?.molmim_error && (
                      <div className="col-span-full p-4 bg-red-900/10 border border-red-900/30 text-[10px] font-mono text-red-500 whitespace-pre-wrap">
                        {r.protein.molmim_error}
                      </div>
                    )}
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
