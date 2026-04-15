import { MoleculeStructure } from "./MoleculeStructure";

export function MoleculeCard({ molecule }: { molecule: any }) {
  const isFailed = !molecule?.passes_filter;

  return (
    <div className={`rounded-sm border ${isFailed ? 'border-red-900/30 bg-red-900/5' : 'border-zinc-800 bg-black'} p-4 hover:border-zinc-700 transition-colors relative group`}>
      {isFailed && (
        <div className="absolute top-2 right-2 text-[8px] font-mono text-red-500 bg-red-900/20 px-1 border border-red-900/50">
          FAILED_HEURISTICS
        </div>
      )}
      
      {/* 2D Structure Preview */}
      <div className="mb-4">
        <MoleculeStructure smiles={molecule?.smiles} />
      </div>

      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">SMILES Representation</div>
      <div className="mt-1 break-all font-mono text-xs text-[#76b900] leading-relaxed">
        {molecule?.smiles}
      </div>
      
      <div className="mt-4 pt-4 border-t border-zinc-900 grid grid-cols-2 gap-x-4 gap-y-3 text-[10px] font-mono">
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">MW</span>
          <span className="text-white">{molecule?.mw?.toFixed ? molecule.mw.toFixed(1) : molecule?.mw ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">logP</span>
          <span className="text-white">{molecule?.logp?.toFixed ? molecule.logp.toFixed(2) : molecule?.logp ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">HBD</span>
          <span className="text-white">{molecule?.hbd ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">HBA</span>
          <span className="text-white">{molecule?.hba ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">tPSA</span>
          <span className="text-white">{molecule?.tpsa?.toFixed ? molecule.tpsa.toFixed(1) : molecule?.tpsa ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500 uppercase">QED</span>
          <span className={`font-bold ${molecule?.qed > 0.6 ? 'text-[#76b900]' : 'text-white'}`}>
            {molecule?.qed?.toFixed ? molecule.qed.toFixed(2) : molecule?.qed ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
