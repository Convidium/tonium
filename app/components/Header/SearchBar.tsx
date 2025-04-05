import React, { useRef, useState } from "react";
import SearchSVG from "@/app/ui/icons/Search.svg";
import "@/app/ui/styles/SearchBar.scss";
import "@/app/ui/ui-elements.scss";
import { useSearch } from "@/app/hooks/useSearch";
import { useDebounce } from "@/app/hooks/useDebounce";
import SearchResults from "./SearchResults";

const SearchBar: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    records,
    recentRecords,
    loading,
    isFocused,
    setIsFocused,
    songs,
    artists,
  } = useSearch();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const filters = ["Records", "Artists", "Songs", "Articles"];
  const [activeFilters, setActiveFilters] = React.useState<string[]>(filters);

  const handleFilterClick = (filter: string) => {
    setActiveFilters((prevFilters) => {
      if (prevFilters.length === 1 && prevFilters.includes(filter)) {
        return filters;
      } else {
        const filterToLower = filter;
        if (prevFilters.includes(filterToLower)) {
          return prevFilters.filter((f) => f !== filterToLower);
        } else {
          return [...prevFilters, filterToLower];
        }
      }
    });
  };

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
      <div className={`search-results-wrapper ${isFocused ? "active" : "inactive"}`} ref={resultsRef}>
        <div className="search-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilters.includes(filter) ? "active" : ""}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <SearchResults
          songs={songs}
          records={records}
          artists={artists}
          recentRecords={recentRecords}
          loading={loading}
          searchTerm={debouncedSearchTerm}
          filters={activeFilters}
        />
      </div>
    </div>
  );
};

export default SearchBar;