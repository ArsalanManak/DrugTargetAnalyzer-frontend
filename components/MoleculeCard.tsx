export function MoleculeCard({ molecule }: { molecule: any }) {
  return (
    <div className="rounded-md border border-zinc-200 bg-white p-3">
      <div className="text-xs text-zinc-500">SMILES</div>
      <div className="mt-1 break-all font-mono text-xs text-zinc-900">
        {molecule?.smiles}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-700">
        <div>MW: {molecule?.mw?.toFixed ? molecule.mw.toFixed(1) : molecule?.mw ?? "-"}</div>
        <div>logP: {molecule?.logp?.toFixed ? molecule.logp.toFixed(2) : molecule?.logp ?? "-"}</div>
        <div>HBD: {molecule?.hbd ?? "-"}</div>
        <div>HBA: {molecule?.hba ?? "-"}</div>
        <div>tPSA: {molecule?.tpsa?.toFixed ? molecule.tpsa.toFixed(1) : molecule?.tpsa ?? "-"}</div>
        <div>QED: {molecule?.qed?.toFixed ? molecule.qed.toFixed(2) : molecule?.qed ?? "-"}</div>
      </div>
    </div>
  );
}
