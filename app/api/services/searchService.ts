import { searchFTS } from "../db";

export async function searchRecords(query: string, tables: string[] = ["song_files", "records", "artists", "recent_listened_records"]): 
    Promise<{ data: any; status: number; error?: string }> {
    
    console.log("Search query received:", query, "in tables:", tables);
    
    try {
        // Викликаємо searchFTS з переданими таблицями
        const result = await searchFTS(query, tables);
        console.error("Search result:", result);

        if (result.error) {
            console.error("Search error:", result.error);
            return { data: null, status: 500, error: result.error };
        }

        return { data: result.data, status: 200 };
    } catch (error: any) {
        console.error("Error performing search across tables:", error);
        return { data: null, status: 500, error: "Internal server error" };
    }
}