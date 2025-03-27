import { NextRequest, NextResponse } from 'next/server';
import { findMany } from '../../db';

interface Params {
  artist_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { artist_id } = await params;
  const filters = artist_id ? { artist_id: parseInt(artist_id, 10) } : {};
  const result = await findMany('artists', filters);
  return NextResponse.json(result, { status: result.status });
}