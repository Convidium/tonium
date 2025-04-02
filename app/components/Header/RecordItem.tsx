import React from "react";
import Image from "next/image";
import PlaySVG from "@/app/icons/play.svg";
import MoreSVG from "@/app/icons/3-dots.svg";
import { RecordType } from "@/app/types/records";
import Marquee from "./Marquee";
import testImage from "@/app/icons/vinyl_low_res.png";
import "../../ui/styles/RecordItem.scss";
import ArrowSVG from "@/app/icons/arrow.svg";

interface RecordItemProps {
  records: RecordType[];
}

const RecordItem: React.FC<RecordItemProps> = ({ records }) => {
  return (
    <div className="search-results-section records">
      <div className="title-block">
        <div className="title">Found Records:</div>
        <div className="more title">
          <span>More</span> <ArrowSVG />
        </div>
      </div>
      <div className="items-list records">
        {records.map((record: RecordType) => (
          <div className="record" key={record.record_id}>
            <div className="record-image">
              <Image
                src={record.image || testImage}
                alt="Record cover image"
                width={60}
                height={60}
              />
              <div className="playHover">
                <PlaySVG />
              </div>
            </div>
            <div className="record-info">
              <Marquee title={record.title} artist={record.artist} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordItem;