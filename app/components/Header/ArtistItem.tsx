import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArtistType } from "@/app/types/records";
import "../../ui/styles/ArtistItem.scss";
import DefaultProfileSVG from "@/app/icons/user-default-2.svg";
import "../../ui/scrollbar.scss";
import ArrowSVG from "@/app/icons/arrow.svg";

interface ArtistItemProps {
  artists: ArtistType[];
}

const ArtistItem: React.FC<ArtistItemProps> = ({ artists }) => {
  const artistsGridRef = useRef<HTMLDivElement>(null);
  const artistsWrapperRef = useRef<HTMLDivElement>(null);
  const [isArtistsScrollable, setIsArtistsScrollable] = useState(false);

  const checkScrollbar = (wrapper: any, slider: any) => {
    const wrapperElement = wrapper.current || null;
    const sliderElement = slider.current || null;
    if (sliderElement == null || wrapperElement == null) {
      return false
    }
    if (sliderElement.clientWidth < wrapperElement.clientWidth) {
      return true
    }
    return false;
  };

  useEffect(() => {
    setIsArtistsScrollable(checkScrollbar(artistsWrapperRef, artistsGridRef));
  }, [artists]);
  return (
    <div className="search-results-section artists">
      <div className="title-block">
        <div className="title">Found Artists:</div>
        <div className="more title">
          <span>More</span> <ArrowSVG />
        </div>
      </div>
      <div className={`items-wrapper ${isArtistsScrollable ? 'scrollbar-hidden' : ''}`} ref={artistsWrapperRef}>
        <div className="items-grid" ref={artistsGridRef}>
          {artists.map((artist: ArtistType, index: number) => (
            <div className="artist" key={index}>
              <div className="artist-image">
                {artist.image ? (
                  <Image
                    src={artist.image}
                    alt="Artist logo"
                    width={35}
                    height={35}
                    className="logo"
                  />
                ) : (
                  <DefaultProfileSVG width={35} height={34} className="logo" />
                )}
              </div>
              <div className="artist-name">{artist.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistItem;