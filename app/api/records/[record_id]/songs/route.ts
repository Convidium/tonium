import { NextRequest, NextResponse } from "next/server";
import { findSongs, createSong } from "../../../services/songFileService";

interface Params {
    record_id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const resolvedParams = await params;
    const albumId = parseInt(resolvedParams.record_id, 10);
    if (isNaN(albumId)) {
        return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const filters: Record<string, string | string[]> = {};

        for (const [key, value] of searchParams.entries()) {
            if (filters[key]) {
                if (Array.isArray(filters[key])) {
                    (filters[key] as string[]).push(value);
                } else {
                    filters[key] = [filters[key] as string, value];
                }
            } else {
                filters[key] = value;
            }
        }

        const result = await findSongs(albumId, filters);
        return NextResponse.json(result, { status: result.status });
    } catch (error: any) {
        console.error("Error processing GET request:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
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