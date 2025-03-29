import { NextRequest, NextResponse } from 'next/server';
import { findOne } from '../../utils/db';
import { RequestParser } from '@/app/api/utils/RequestParser';

export async function GET(request: NextRequest) {
  try {
      const params = new RequestParser(request);
      const recordId = params.getRecordId();

      if (!recordId) {
          return NextResponse.json({ error: "Invalid record ID" }, { status: 400 });
      }

      const result = await findOne("records", { record_id: recordId });

      if (result.error) {
          return NextResponse.json({ error: result.error }, { status: result.status });
      }

      return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
      console.error("Error fetching record:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}