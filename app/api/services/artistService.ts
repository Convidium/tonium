import { findMany, createOne } from "../utils/db";
import ArtistData, { ArtistCreateInput } from '@/app/interfaces/artist-data';

type FindRecordsResult =
    | { data: ArtistData; status: number }
    | { error: string; status: number };

export async function findrtist(filters: any): Promise<FindRecordsResult> {
    console.log("Filters received in findArtists:", filters);
    try {
        const result = await findMany("artists", filters);
        return { data: result.data as ArtistData, status: 200 };
    } catch (error) {
        console.error("Error fetching artists:", error);
        return { error: "Internal server error", status: 500 };
    }
}

export async function addArtist(artistData: ArtistCreateInput): Promise<{ data: ArtistData | null; status: number; error?: string }> {
    console.log("Record data received in addArtists:", artistData);
    try {
        const result = await createOne("artists", artistData);
        if (result.data) {
            return { data: result.data as ArtistData, status: 201 };
        } else {
            return { data: null, status: 500, error: "Failed to create an artist" };
        }
    } catch (error: any) {
        console.error("Error creating record:", error);
        return { data: null, status: 500, error: error.message || "Internal server error" };
    }
}