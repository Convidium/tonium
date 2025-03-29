import { RecordType } from "@/app/types/records";

export const fetchRecords = async (query: string): Promise<RecordType[]> => {
    try {
        const res = await fetch(`/api/search?q=${query}`);
        console.log(res);
        
        if (!res.ok) throw new Error("Failed to fetch records");
        const data = await res.json();
        return Array.isArray(data.records) ? data.records : [];
    } catch (error) {
        console.error("Error fetching records:", error);
        return [];
    }
};

export const fetchRecentRecords = async (): Promise<RecordType[]> => {
    try {
        const res = await fetch(`/api/recent_listened_records?limit=6`);
        if (!res.ok) throw new Error("Failed to fetch recent records");
        const data = await res.json();
        return Array.isArray(data.records) ? data.records : [];
    } catch (error) {
        console.error("Error fetching recent records:", error);
        return [];
    }
};