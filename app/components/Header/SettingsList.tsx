import React, { useEffect, useRef, useState } from "react";
import SettingsSVG from "@/app/ui/icons/Settings.svg";
import "@/app/ui/styles/DropdownList.scss";
import "@/app/ui/styles/ui-components/ColorPaletteSelector.scss";

const SettingsList: React.FC = () => {
    const [hue, setHue] = useState(Number(localStorage.getItem('cp-h')) || 0);
    const [saturation, setSaturation] = useState(Number(localStorage.getItem('cp-s')) || 0);

    const blockRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleSelect = () => {
        setIsFocused(true);
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

    useEffect(() => {
        document.documentElement.style.setProperty('--cp-h', hue.toString());
        document.documentElement.style.setProperty('--cp-s', `${saturation}%`);

        localStorage.setItem('cp-h', hue.toString());
        localStorage.setItem('cp-s', saturation.toString());

        // Update slider backgrounds and thumb color
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

        // Update thumb color via CSS var
        const thumbColor = `hsl(${hue}, ${saturation}%, 50%)`;
        document.documentElement.style.setProperty('--thumb-color', thumbColor);
    }, [hue, saturation]);

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='header-element settings-block' ref={blockRef}>
            <div className={`skeumorphic-bg ${isFocused ? "active-btn" : "inactive-btn"}`} onClick={() => handleSelect()}>
                <button className='settings-btn'>
                    <SettingsSVG />
                </button>
            </div>
            <div className={`dropdown-list-wrapper setting-options ${isFocused ? "active" : "inactive"}`} ref={listRef}>
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
            </div>
        </div>
    );
};

export default SettingsList;