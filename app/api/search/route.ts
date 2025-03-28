import { NextRequest, NextResponse } from 'next/server';
import { searchRecords } from '../services/searchService';
import convertBigIntToString from '../utils/convertBigIntToString';

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  console.log(query);
  
  const tablesParam = searchParams.get('tables');

  if (!query) {
      return NextResponse.json({ error: "Search query 'q' is required" }, { status: 400 });
  }

  let tablesToSearch: string[] = ["search_index"];
  if (tablesParam) {
      tablesToSearch = tablesParam.split(',');
  }

  const result = await searchRecords(query, tablesToSearch);

  if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const serializedData = convertBigIntToString(result.data);
  return NextResponse.json(serializedData, { status: result.status });
}