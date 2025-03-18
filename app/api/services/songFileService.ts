import { NextResponse } from "next/server";
import { findMany, createRecord } from "../db";

interface RecordData {
    record_id: number;
    record_type: string;
    record_name: string;
    record_artist?: number | null; // Знак питання робить поле необов'язковим, | null враховує можливість null
    record_date?: Date | null;
    record_info?: string | null;
    record_label?: string | null;
    record_producer?: string | null;
    record_cover_path?: string | null;
    record_backcover_path?: string | null;
    record_back_cover_path?: string | null;
    artists?: any | null; // Можливо, ви захочете створити окремий інтерфейс для Artist
    record_genres: any; // Масив об'єктів record_genres
    record_moods: any; // Масив об'єктів record_moods
    song_files: any; // Масив об'єктів song_files
    recent_listened_records: any; // Масив об'єктів recent_listened_records
}

export async function findSongs(albumId: number, filters: Record<string, any> = {}) {
    console.log("Album ID in findSongs:", albumId);
    console.log("Filters received in findSongs:", filters);

    if (filters.song_id) {
        if (Array.isArray(filters.song_id)) {
            filters.song_id = { in: filters.song_id.map(id => parseInt(id, 10)) };
        } else {
            filters.song_id = parseInt(filters.song_id, 10);
        }
    }

    const whereClause = { album_id: albumId, ...filters };
    console.log("Where Clause for Prisma:", whereClause);

    try {
        const result = await findMany("song_files", whereClause);
        return { data: result.data, status: 200 };
    } catch (error) {
        console.error("Error fetching songs:", error);
        return { error: "Internal server error", status: 500 };
    }
}

export async function createSong(albumId: number, songData: any) {
    try {
        const dataToCreate = {
            album_id: albumId,
            ...songData,
        };
        const result = await createRecord("song_files", dataToCreate);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating song:", error);
        return NextResponse.json({ error: "Failed to create song", status: 500 });
    }
}