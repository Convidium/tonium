import { NextRequest, NextResponse } from 'next/server';
import { findMany } from '../utils/db';
import { addRecord } from "../services/recordService";

export async function GET(req: NextRequest) {
  const result = await findMany("records");
  return NextResponse.json(result, { status: result.status });
}

export async function POST(req: NextRequest) {
  try {
    const recordData = await req.json();
    const result = await addRecord(recordData);
    return NextResponse.json(result, { status: result.status });
  } catch (error: any) {
    console.error("Error creating record:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}