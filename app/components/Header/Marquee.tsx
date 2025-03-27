import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
    title: string;
    artist: string;
}

const Marquee: React.FC<MarqueeProps> = ({ title, artist }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const artistRef = useRef<HTMLDivElement>(null);

    // Стан для заголовка
    const [titleState, setTitleState] = useState("start");
    const [titleDistance, setTitleDistance] = useState(0);

    // Стан для виконавця
    const [artistState, setArtistState] = useState("start");
    const [artistDistance, setArtistDistance] = useState(0);

    useEffect(() => {
        if (!containerRef.current || !titleRef.current || !artistRef.current) return;

        const containerWidth = 280; // Фіксована ширина
        const titleWidth = titleRef.current.scrollWidth;
        const artistWidth = artistRef.current.scrollWidth;

        if (titleWidth > containerWidth) {
            setTitleDistance(titleWidth - containerWidth);
            setTitleState("moving");
        }

        if (artistWidth > containerWidth) {
            setArtistDistance(artistWidth - containerWidth);
            setArtistState("moving");
        }
    }, []);

    return (
        <div className="record-data marquee-container" ref={containerRef}>
            <div
                className={`title marquee-text ${titleState}`}
                ref={titleRef}
                style={{ "--move-distance": `${titleDistance}px` } as React.CSSProperties}
                onAnimationEnd={() => {
                    if (titleState === "moving") {
                        setTimeout(() => setTitleState("end"), 3000);
                    } else {
                        setTimeout(() => setTitleState("moving"), 5000);
                    }
                }}
            >
                {title}
            </div>
            <div
                className={`artist marquee-text ${artistState}`}
                ref={artistRef}
                style={{ "--move-distance": `${artistDistance}px` } as React.CSSProperties}
                onAnimationEnd={() => {
                    if (artistState === "moving") {
                        setTimeout(() => setArtistState("end"), 3000);
                    } else {
                        setTimeout(() => setArtistState("moving"), 5000);
                    }
                }}
            >
                {artist}
            </div>
        </div>
    );
};

export default Marquee;