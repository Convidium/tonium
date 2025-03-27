import React from "react";
import RecordItem from "./RecordItem";
import { RecordType } from "@/app/types/records";
import LoadingSVG from "@/app/icons/LoadingCircle.svg";

type SearchResultsProps = {
    records: RecordType[];
    recentRecords: RecordType[];
    loading: boolean;
    searchTerm: string;
};

const SearchResults: React.FC<SearchResultsProps> = ({ records, recentRecords, loading, searchTerm }) => {
    return (
        <>
            {loading ? (
                <div className="loading-results">
                    <LoadingSVG width="48" height="48" />
                </div>
            ) : (
                <div className="results-list">
                    {searchTerm.length > 0 ? (
                        records.length > 0 ? (
                            records.map((record) => <RecordItem key={record.id} record={record} />)
                        ) : (
                            <div className="no-results">No records found</div>
                        )
                    ) : (
                        <>
                            <div className="last-listened title">Last Listened:</div>
                            {recentRecords.length > 0 ? (
                                recentRecords.map((record) => <RecordItem key={record.id} record={record} />)
                            ) : (
                                <div className="no-results">No recent records</div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchResults;