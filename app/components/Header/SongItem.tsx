import React from "react";
import Image from "next/image";
import PlaySVG from "@/app/ui/icons/play.svg";
import PlusSVG from "@/app/ui/icons/play.svg";
import { SongType } from "@/app/domain/types/records";
import Marquee from "./Marquee";
import testImage from "@/app/ui/icons/vinyl_low_res.png";
import "../../ui/styles/SongItem.scss";
import ArrowSVG from "@/app/ui/icons/arrow.svg";

interface SongItemProps {
  songs: SongType[];
}

const SongItem: React.FC<SongItemProps> = ({ songs }) => {
  return (
    <div className="search-results-section songs">
      <div className="title-block">
        <div className="title">Found Songs:</div>
        <div className="more title">
          <span>More</span> <ArrowSVG />
        </div>
      </div>
      <div className="items-list songs">
        {songs.map((song: SongType) => (
          <div className="song" key={song.song_id}>
            <div className="song-image">
              <Image
                src={song.image || testImage}
                alt="Album cover image"
                width={50}
                height={50}
              />
              <div className="playHover">
                <PlaySVG />
              </div>
            </div>
            <div className="song-info">
              <Marquee title={song.title} artist={song.artist} />
            </div>
            <div className="song-control">
              X:XX
              {song.duration && <div className="duration">{song.duration}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongItem;