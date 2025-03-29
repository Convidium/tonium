import { NextRequest, NextResponse } from 'next/server';
import { findMany } from '../../utils/db';

interface Params {
  record_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { record_id } = await params;
  const filters = record_id ? { record_id: parseInt(record_id, 10) } : {};
  const result = await findMany('records', filters);
  return NextResponse.json(result, { status: result.status });
}