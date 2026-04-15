import { MolViewer } from "./MolViewer";

export function ProteinCard({
  protein,
  pdbText,
}: {
  protein: any;
  pdbText: string | null;
}) {
  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-zinc-200">
        <div className="text-sm font-semibold text-zinc-900">
          {protein?.protein_name ?? "Unnamed protein"}
        </div>
        <div className="mt-1 text-xs text-zinc-600">
          UniProt: <span className="font-mono">{protein?.uniprot_id}</span>
        </div>
        {protein?.organism ? (
          <div className="mt-1 text-xs text-zinc-600">Organism: {protein.organism}</div>
        ) : null}
        {protein?.gene ? (
          <div className="mt-1 text-xs text-zinc-600">Gene: {protein.gene}</div>
        ) : null}
        {protein?.alphafold_error ? (
          <div className="mt-2 text-xs text-red-600">AlphaFold error: {protein.alphafold_error}</div>
        ) : null}
      </div>
      <div className="p-4">
        <MolViewer pdbText={pdbText} />
      </div>
    </div>
  );
}
