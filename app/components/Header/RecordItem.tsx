import React from "react";
import Image from "next/image";
import PlaySVG from "@/app/icons/play.svg";
import CloseSVG from "@/app/icons/xmark.svg";
import { RecordType } from "@/app/types/records";
import Marquee from "./Marquee";
import testImage from "@/app/icons/test-img.jpg";

type RecordItemProps = {
    record: RecordType;
};

const RecordItem: React.FC<RecordItemProps> = ({ record }) => {
    return (
        <div className="record" key={record.id}>
            <div className="record-image">
                <Image
                    src={record.image || testImage}
                    alt="Record cover image"
                    width={50}
                    height={50}
                />
                <div className="play-hover">
                    <PlaySVG />
                </div>
            </div>
            <Marquee title={record.title} artist={record.artist} />
            <div className="record-control">
                <button>
                    <CloseSVG />
                </button>
            </div>
        </div>
    );
};

export default RecordItem;