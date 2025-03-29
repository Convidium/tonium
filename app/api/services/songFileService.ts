import { NextResponse } from "next/server";
import { findMany, createOne } from "../utils/db";

export async function findSongs(
    albumId: number, 
    filters: Record<string, any> = {}, 
    limit: number = 10, 
    page: number = 1
) {
    console.log("Album ID in findSongs:", albumId);
    console.log("Filters received in findSongs:", filters);
    console.log("Limit:", limit, "Page:", page);

    // Обробка song_id, якщо він переданий у вигляді масиву
    if (filters.song_id) {
        if (Array.isArray(filters.song_id)) {
            filters.song_id = { in: filters.song_id.map(id => parseInt(id, 10)) };
        } else {
            filters.song_id = parseInt(filters.song_id, 10);
        }
    }

    // Формуємо `where` для Prisma
    const whereClause = { album_id: albumId, ...filters };
    console.log("Where Clause for Prisma:", whereClause);

    try {
        const result = await findMany("song_files", whereClause, limit, page);
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
        const result = await createOne("song_files", dataToCreate);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error creating song:", error);
        return NextResponse.json({ error: "Failed to create song", status: 500 });
    }
}