import { searchFTS } from "../utils/db";

export async function searchRecords(
    query: string,
    tables: string[],
    limit: number = 10,
    page: number = 1
): Promise<{ data: any; status: number; error?: string }> {
    console.log("Search query received:", query, "in tables:", tables, "limit:", limit, "page:", page);
    try {
        const result = await searchFTS(query, tables, limit, page);
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