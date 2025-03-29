import { NextRequest, NextResponse } from "next/server";
import { findSongs, createSong } from "../../../services/songFileService";
import { RequestParser } from "@/app/api/utils/RequestParser";

interface Params {
    record_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const parser = new RequestParser(req);
        const albumId = parser.getRecordId();
        const filters = parser.getFilters();
        const limit = parser.getLimit();
        const page = parser.getPage();

        if (!albumId) {
            return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
        }

        const result = await findSongs(albumId, filters, limit, page);
        return NextResponse.json(result, { status: result.status });

    } catch (error: any) {
        console.error("Error processing GET request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
    const resolvedParams = await params;
    const albumId = parseInt(resolvedParams.record_id, 10);
    if (isNaN(albumId)) {
        return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    try {
        const songData = await req.json();
        const result = await createSong(albumId, songData);
        return NextResponse.json(result, { status: result.status });
    } catch (error: any) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}