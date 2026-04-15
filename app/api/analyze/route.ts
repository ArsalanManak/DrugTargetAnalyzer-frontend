import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendUrl =
    process.env.BACKEND_URL ?? "https://arsalan-joiya-drugtargetanalyzer.hf.space";

  const r = await fetch(`${backendUrl.replace(/\/$/, "")}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await r.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {
    // ignore
  }

  return NextResponse.json(data, { status: r.status });
}
