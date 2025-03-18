import { findMany } from "../api/db";

export async function getSongs(albumId: number, filters: Record<string, any>) {
    const queryFilters = { album_id: albumId, ...filters };

    try {
        const result = await findMany("song_files", queryFilters);
        return { data: result.data, status: 200 };
    } catch (error) {
        console.error("Error fetching songs:", error);
        return { error: "Internal server error", status: 500 };
    }
}