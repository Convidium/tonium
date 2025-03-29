import { NextRequest, NextResponse } from 'next/server';
import { searchRecords } from '../services/searchService';
import convertBigIntToString from '../utils/convertBigIntToString';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        console.log("Search query received:", query);

        if (!query) {
            return NextResponse.json({ error: "Search query 'q' is required" }, { status: 400 });
        }

        // Check if `tables` string exists. 
        // If it does - split to get all tables, or else return all possible tables
        const tablesParam = searchParams.get('tables');
        const tablesToSearch = tablesParam ? tablesParam.split(',') : ["song_files", "records", "artists", "recent_listened_records"];

        const limitParam = searchParams.get('limit');
        const pageParam = searchParams.get('page');
        const limit = limitParam ? parseInt(limitParam, 10) : 10;
        const page = pageParam ? parseInt(pageParam, 10) : 1;

        if (isNaN(limit) || limit <= 0) {
            return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 });
        }

        if (isNaN(page) || page <= 0) {
            return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
        }

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