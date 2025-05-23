import { NextRequest, NextResponse } from 'next/server';
import { RequestParser } from '@/app/api/utils/RequestParser';
import { searchRecords } from '@/app/api/services/searchService';
import convertBigIntToString from '@/app/api/utils/convertBigIntToString';

export async function GET(request: NextRequest) {
    try {
        const parser = new RequestParser(request);

        const query = parser.getQueryParam();
        if (!query) {
            return NextResponse.json({ error: "Search query 'q' is required" }, { status: 400 });
        }

        const tablesToSearch = parser.getTables();
        const limit = parser.getLimit();
        
        const page = parser.getPage();

        const result = await searchRecords(query, tablesToSearch, limit, page);
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: result.status });
        }

        const serializedData = convertBigIntToString(result.data);
        return NextResponse.json({ data: serializedData }, { status: result.status });

    } catch (error: any) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}