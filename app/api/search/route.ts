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

        // Обробляємо параметр tables (якщо переданий)
        const tablesParam = searchParams.get('tables');
        let tablesToSearch = tablesParam ? tablesParam.split(',') : ["song_files", "records", "artists", "recent_listened_records"];

        const result = await searchRecords(query, tablesToSearch);

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