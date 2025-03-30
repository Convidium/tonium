import { NextRequest, NextResponse } from "next/server";
import { findOne } from "@/app/api/utils/db";
import { RequestParser } from "@/app/api/utils/RequestParser";

export async function GET(req: NextRequest) {
    try {
        const parser = new RequestParser(req);
        const recordId = parser.getRecordId();
        const songId = parser.getSongId();

        if (recordId === null || songId === null) {
            return NextResponse.json({ error: "Invalid record_id or song_id" }, { status: 400 });
        }

        const result = await findOne("song_files", { album_id: recordId, song_id: songId });

        if (!result.data) {
            return NextResponse.json({ error: "Song not found" }, { status: 404 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching song:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}