import { useState, useEffect } from "react";
import { fetchRecords, fetchRecentRecords } from "@/app/services/recordService";
import { RecordType } from "@/app/types/records";

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [records, setRecords] = useState<RecordType[]>([]);
    const [recentRecords, setRecentRecords] = useState<RecordType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        if (searchTerm.length > 1) {
            setLoading(true);
            fetchRecords(searchTerm).then((data) => {
                setRecords(data);
                setLoading(false);
            });
        } else {
            setRecords([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (isFocused && recentRecords.length === 0) {
            fetchRecentRecords().then(setRecentRecords);
        }
    }, [isFocused]);

    return {
        searchTerm,
        setSearchTerm,
        records,
        recentRecords,
        loading,
        isFocused,
        setIsFocused,
    };
};