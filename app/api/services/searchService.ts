import { searchFTS } from "../db";
import RecordData from "../../interfaces/record-data";

const searchFields: any = {
    search_index: ["record_name", "artist_name", "song_name", "record_label", "record_producer", "record_info", "content"]
};

export async function searchRecords(query: string, tables: string[]): Promise<{ data: any[] | null; status: number; error?: string }> {
    console.log("Search query received:", query, "in tables:", tables);
    const allResults: any[] = [];
    try {
        if (searchFields["search_index"]) {
            const result = await searchFTS("search_index", query, searchFields["search_index"]);
            if (result && Array.isArray(result.data)) {
                allResults.push(...result.data);
            } else {
                console.warn(`No search fields defined for table: search_index`);
            }
        }
        return { data: allResults, status: 200 };
    } catch (error: any) {
        console.error("Error performing search across tables:", error);
        return { data: null, status: 500, error: "Internal server error" };
    }
}