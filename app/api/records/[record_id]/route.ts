import { NextRequest, NextResponse } from 'next/server';
import { findMany } from '../../db';

export async function GET(req: NextRequest, { params }) {
  const { record_id } = await params;
  const filters = record_id ? { record_id: parseInt(record_id, 10) } : {};
  const result = await findMany('records', filters);
  return NextResponse.json(result, { status: result.status });
}