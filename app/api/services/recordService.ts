import { findMany, createOne } from "../db";
import RecordData, { RecordCreateInput } from '@/app/interfaces/record-data';

type FindRecordsResult =
    | { data: RecordData; status: number }
    | { error: string; status: number };

export async function findRecords(filters: any): Promise<FindRecordsResult> {
    console.log("Filters received in findRecords:", filters);
    try {
        const result = await findMany("records", filters);
        return { data: result.data as RecordData, status: 200 };
    } catch (error) {
        console.error("Error fetching records:", error);
        return { error: "Internal server error", status: 500 };
    }
}

export async function addRecord(recordData: RecordCreateInput): Promise<{ data: RecordData | null; status: number; error?: string }> {
    console.log("Record data received in addRecord:", recordData);
    try {
        const result = await createOne("records", recordData);
        if (result.data) {
            return { data: result.data as RecordData, status: 201 };
        } else {
            return { data: null, status: 500, error: "Failed to create record" };
        }
    } catch (error: any) {
        console.error("Error creating record:", error);
        return { data: null, status: 500, error: error.message || "Internal server error" };
    }
}