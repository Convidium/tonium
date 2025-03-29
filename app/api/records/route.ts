import { NextRequest, NextResponse } from 'next/server';
import { findMany } from '../utils/db';
import { RequestParser } from '@/app/api/utils/RequestParser';
import { addRecord } from "../services/recordService";

export async function GET(request: NextRequest) {
  try {
      const parser = new RequestParser(request);
      const filters = parser.getFilters();
      const limit = parser.getLimit();
      const page = parser.getPage();

      const result = await findMany("records", filters, limit, page);
      return NextResponse.json(result, { status: result.status });

  } catch (error: any) {
      console.error("API error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
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