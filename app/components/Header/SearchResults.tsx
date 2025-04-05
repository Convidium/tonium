import React from "react";
import RecordItem from "./RecordItem";
import SongItem from "./SongItem";
import ArtistItem from "./ArtistItem";
import { RecordType, SongType, ArtistType } from "@/app/types/records";
import "@/app/ui/styles/SearchResults.scss";
import LoadingSVG from "@/app/ui/icons/LoadingCircle.svg";
import ArrowSVG from "@/app/ui/icons/arrow.svg";
import "../../ui/scrollbar.scss";

type SearchResultsProps = {
  songs: SongType[];
  records: RecordType[];
  artists: ArtistType[];
  recentRecords: RecordType[];
  loading: boolean;
  searchTerm: string;
  filters: string[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ songs, records, artists, recentRecords, loading, searchTerm, filters }) => {
  console.log(filters);
  
  const renderedReults = filters.map(filter => {
    if (filter == "Artists" && records.length > 0) {
      return (
        <RecordItem records={records} />
      );
    }
    else if (filter == "Records" && records.length > 0) {
      return (
        <RecordItem records={records} />
      );
    }
    else if (filter == "Songs" && songs.length > 0) {
      return (
        <SongItem songs={songs} />
      );
    }
  })
  return (
    <div className="search-results-block">
      {loading ? (
        <div className="loading-results">
          <LoadingSVG width="48" height="48" />
        </div>
      ) : (
        <div className="results-list">
          {searchTerm.length > 0 ? (
            <>
              {renderedReults}
              {artists.length === 0 && records.length === 0 && songs.length === 0 && (
                <div className="no-results">No results found</div>
              )}
            </>
          ) : (
            <div className="search-results-section songs">
              <div className="title-block">
                <div className="last-listened title">Last Listened:</div>
                <div className="more title">
                  <span>More</span> <ArrowSVG />
                </div>
              </div>
              {recentRecords.length > 0 ? (
                <div className="items-list">
                  {/* {recentRecords.map((record) => (
                    <RecordItem record={record} />
                  ))} */}
                  In Progress...
                </div>
              ) : (
                <div className="no-results">No recent records</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;