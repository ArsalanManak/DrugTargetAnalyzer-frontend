"use client";

import { useState } from "react";

const DEFAULT_DISEASES = [
  "Malaria",
  "Diabetes mellitus",
  "Hypertension",
  "Breast cancer",
  "Lung cancer",
  "Alzheimer's disease",
  "Parkinson's disease",
  "Tuberculosis",
  "Hepatitis B",
  "COVID-19",
  "HIV",
  "Asthma",
];

export function SearchBar({
  initialDisease,
  onSearch,
  loading,
}: {
  initialDisease?: string;
  onSearch: (disease: string) => void;
  loading: boolean;
}) {
  const [disease, setDisease] = useState(
    DEFAULT_DISEASES.includes(initialDisease ?? "")
      ? (initialDisease as string)
      : DEFAULT_DISEASES[0]
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-400"
        >
          {DEFAULT_DISEASES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <button
          disabled={loading || disease.trim().length < 2}
          onClick={() => onSearch(disease.trim())}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Find drug targets"}
        </button>
      </div>
      <p className="text-xs text-zinc-600">
        Backend will query UniProt → fetch AlphaFold structure → generate molecules via MolMIM → filter via RDKit.
      </p>
    </div>
  );
}
