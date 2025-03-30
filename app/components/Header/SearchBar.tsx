import React, { useRef } from "react";
import SearchSVG from "@/app/icons/Search.svg";
import "@/app/ui/styles/SearchBar.scss";
import "@/app/ui/ui-elements.scss";
import { useSearch } from "@/app/hooks/useSearch";
import { useDebounce } from "@/app/hooks/useDebounce";
import SearchResults from "./SearchResults";

const SearchBar: React.FC = () => {
    const { searchTerm, setSearchTerm, records, recentRecords, loading, isFocused, setIsFocused } = useSearch();
    const searchBarRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 100);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target as Node) &&
            resultsRef.current &&
            !resultsRef.current.contains(event.target as Node)
        ) {
            setIsFocused(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="header-element search-bar-block" ref={searchBarRef}>
            <div className="skeumorphic-bg">
                <div className={`search-bar-component ${isFocused ? "onfocus" : ""}`}>
                    <button className="search-btn">
                        <SearchSVG />
                    </button>
                    <input
                        className="search-input"
                        placeholder="Looking for something, huh?"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsFocused(true);
                        }}
                        onFocus={() => setIsFocused(true)}
                    />
                </div>
            </div>
            <div className={`search-results-block ${isFocused ? "active" : "inactive"}`} ref={resultsRef}>
                <SearchResults 
                    records={records} 
                    recentRecords={recentRecords} 
                    loading={loading} 
                    searchTerm={debouncedSearchTerm}
                />
            </div>
        </div>
    );
};

export default SearchBar;