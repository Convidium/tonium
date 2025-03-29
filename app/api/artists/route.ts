import { NextRequest, NextResponse } from 'next/server';
import { findMany } from '../utils/db';
import { addArtist } from "../services/artistService";

export async function GET(req: NextRequest) {
  const result = await findMany("artists");
  return NextResponse.json(result, { status: result.status });
}

export async function POST(req: NextRequest) {
  try {
    const artistData = await req.json();
    const result = await addArtist(artistData);
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("Error creating artist:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}