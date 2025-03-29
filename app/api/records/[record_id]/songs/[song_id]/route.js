import { NextResponse } from 'next/server';
import { findOne } from '../../../../utils/db';

export async function GET(req, { params }) {
  const { song_id } = params;
  const result = await findOne('song_files', { song_id: parseInt(song_id, 10) });
  return NextResponse.json(result, { status: result.status });
}