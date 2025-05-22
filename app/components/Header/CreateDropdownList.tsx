import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import PlaySVG from "@/app/ui/icons/play.svg";
import CreateSVG from "@/app/ui/icons/fat-plus.svg";
import ArtistSVG from "@/app/ui/icons/user.svg";
import AlbumSVG from "@/app/ui/icons/record.svg";
import SingleSVG from "@/app/ui/icons/single-icon.svg";
import CompilationSVG from "@/app/ui/icons/collection-icon.svg";
import TrackSVG from "@/app/ui/icons/song.svg";
import ArticleSVG from "@/app/ui/icons/article.svg";
import "@/app/ui/styles/DropdownList.scss";

const CreateDropdownList: React.FC = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();
  const handleSelect = (type: string = "") => {
    router.push(`/create/${type}`)
  }

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
      <div className={`skeumorphic-bg ${isFocused ? "active-btn" : "inactive-btn"}`}>
        <button className='create-btn' onDoubleClick={() => handleSelect()}>
          <CreateSVG />
          <span>Create</span>
        </button>
      </div>
      <div className={`dropdown-list-wrapper ${isFocused ? "active" : "inactive"}`} ref={listRef}>
        <div className="dropdown-buttons">
          <button className="dropdown-button" onClick={() => handleSelect("artist")}>
            <ArtistSVG />
            <span>Artist</span>
          </button>
          <button className="dropdown-button" onClick={() => handleSelect("album")}>
            <AlbumSVG />
            <span>Album</span>
          </button>
          <button className="dropdown-button" onClick={() => handleSelect("single")}>
            <SingleSVG />
            <span>Single</span>
          </button>
          <button className="dropdown-button" onClick={() => handleSelect("compilation")}>
            <CompilationSVG />
            <span>Compilation</span>
          </button>
          <button className="dropdown-button" onClick={() => handleSelect("track")}>
            <TrackSVG />
            <span>Track</span>
          </button>
          <button className="dropdown-button" onClick={() => handleSelect("article")}>
            <ArticleSVG />
            <span>Article</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDropdownList;