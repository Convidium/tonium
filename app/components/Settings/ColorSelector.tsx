import React, { useEffect, useRef, useState } from "react";
import "@/app/ui/styles/ui-components/ColorPaletteSelector.scss";

const ColorSelector: React.FC = () => {
    const [hue, setHue] = useState<number | null>(null);
    const [saturation, setSaturation] = useState<number | null>(null);

    useEffect(() => {
        const storedHue = Number(localStorage.getItem('cp-h')) || 0;
        const storedSaturation = Number(localStorage.getItem('cp-s')) || 0;

        setHue(storedHue);
        setSaturation(storedSaturation);
    }, []);

    useEffect(() => {
        if (hue === null || saturation === null) return;

        document.documentElement.style.setProperty('--cp-h', hue.toString());
        document.documentElement.style.setProperty('--cp-s', `${saturation}%`);

        localStorage.setItem('cp-h', hue.toString());
        localStorage.setItem('cp-s', saturation.toString());

        const hueInput = document.getElementById('hue') as HTMLInputElement;
        const satInput = document.getElementById('saturation') as HTMLInputElement;

        if (hueInput)
            hueInput.style.background = `linear-gradient(to right,
                hsl(0, 100%, 50%),
                hsl(60, 100%, 50%),
                hsl(120, 100%, 50%),
                hsl(180, 100%, 50%),
                hsl(240, 100%, 50%),
                hsl(300, 100%, 50%),
                hsl(360, 100%, 50%))`;

        if (satInput)
            satInput.style.background = `linear-gradient(to right,
                hsl(${hue}, 0%, 50%),
                hsl(${hue}, 100%, 50%)
            )`;

        const thumbColor = `hsl(${hue}, ${saturation}%, 50%)`;
        document.documentElement.style.setProperty('--thumb-color', thumbColor);
    }, [hue, saturation]);

    if (hue === null || saturation === null) {
        return null;
    }

    return (
        <div className="color-selector">
            <span>Color Palette Settings</span>
            <div className="slider-track hue-selector">
                <span>Hue:</span>
                <input
                    id="hue"
                    className="slider-input"
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                />
                <div className="slider-thumb"></div>
            </div>
            <div className="slider-track saturation-selector">
                <span>Saturation:</span>
                <input
                    id="saturation"
                    className="slider-input"
                    type="range"
                    min="0"
                    max="100"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                />
                <div className="slider-thumb"></div>
            </div>
        </div>
    );
};

export default ColorSelector;