"use client";

import { useEffect, useRef } from "react";

// @ts-ignore
import SmiDrawer from "smiles-drawer";

export function MoleculeStructure({ smiles }: { smiles: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !smiles) return;

    try {
      const options = {
        width: 250,
        height: 180,
        bondThickness: 1.2,
        bondLength: 15,
        shortBondLength: 0.85,
        fontSizeLarge: 10,
        fontSizeSmall: 7,
        padding: 10,
        theme: "dark", // We'll customize for NVIDIA theme
      };

      const smilesDrawer = new SmiDrawer.Drawer(options);
      
      // Clean canvas before drawing
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, options.width, options.height);

      SmiDrawer.parse(smiles, (tree: any) => {
        smilesDrawer.draw(tree, canvasRef.current, "dark", false);
      }, (err: any) => {
        console.error("SMILES parse error:", err);
      });
    } catch (e) {
      console.error("Structure drawing failed:", e);
    }
  }, [smiles]);

  return (
    <div className="flex justify-center bg-[#050505] rounded-sm p-2 border border-zinc-900/50 group-hover:border-[#76b900]/30 transition-colors">
      <canvas 
        ref={canvasRef} 
        width="250" 
        height="180" 
        className="max-w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
