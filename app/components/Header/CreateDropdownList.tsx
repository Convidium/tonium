import React, { useRef, useState } from "react";
import Image from "next/image";
import PlaySVG from "@/app/icons/play.svg";
import CreateSVG from "@/app/icons/AddNew.svg";
import ArtistSVG from "@/app/icons/user.svg";
import RecordSVG from "@/app/icons/record.svg";
import SongSVG from "@/app/icons/song.svg";
import ArticleSVG from "@/app/icons/article.svg";
import "@/app/ui/styles/dropdownList.scss";

const CreateDropdownList: React.FC = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      blockRef.current &&
      !blockRef.current.contains(event.target as Node) &&
      listRef.current &&
      !listRef.current.contains(event.target as Node)
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
    <div className='header-element create-block' ref={blockRef} onClick={() => setIsFocused(!isFocused)}>
      <div className='skeumorphic-bg'>
        <button className='create-btn'>
          <CreateSVG />
          <span>Create</span>
        </button>
      </div>
      <div className={`dropdown-list-wrapper ${isFocused ? "active" : "inactive"}`} ref={listRef}>
        <div className="dropdown-buttons">
          <button className="dropdown-button">
            <ArtistSVG />
            <span>Artist</span>
          </button>
          <button className="dropdown-button">
            <RecordSVG />
            <span>Record</span>
          </button>
          <button className="dropdown-button">
            <SongSVG />
            <span>Song</span>
          </button>
          <button className="dropdown-button">
            <ArticleSVG />
            <span>Article</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDropdownList;