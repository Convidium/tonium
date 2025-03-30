import { NextRequest, NextResponse } from 'next/server';
import { RequestParser } from '@/app/api/utils/RequestParser';
import { findMany } from '@/app/api/utils/db';
import convertBigIntToString from '@/app/api/utils/convertBigIntToString';
import { addArtist } from '../services/artistService';

export async function GET(request: NextRequest) {
    try {
        const parser = new RequestParser(request);
        const limit = parser.getLimit();
        const page = parser.getPage();

        const result = await findMany("artists", {}, limit, page);
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: result.status });
        }

        const serializedData = convertBigIntToString(result.data);
        return NextResponse.json({ data: serializedData }, { status: result.status });

    } catch (error: any) {
        console.error("API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
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