import React, { useRef, useState } from "react";
import Image from "next/image";
import PlaySVG from "@/app/ui/icons/play.svg";
import CreateSVG from "@/app/ui/icons/AddNew.svg";
import ArtistSVG from "@/app/ui/icons/user.svg";
import AlbumSVG from "@/app/ui/icons/record.svg";
import SingleSVG from "@/app/ui/icons/single-icon.svg";
import CompilationSVG from "@/app/ui/icons/collection-icon.svg";
import SongSVG from "@/app/ui/icons/song.svg";
import ArticleSVG from "@/app/ui/icons/article.svg";
import "@/app/ui/styles/DropdownList.scss";

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
            <AlbumSVG />
            <span>Album</span>
          </button>
          <button className="dropdown-button">
            <SingleSVG />
            <span>Single</span>
          </button>
          <button className="dropdown-button">
            <CompilationSVG />
            <span>Compilation</span>
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