import React, { useEffect, useRef, useState } from "react";
import SettingsSVG from "@/app/ui/icons/Settings.svg";
import LogInSVG from "@/app/ui/icons/Login.svg";
import "@/app/ui/styles/DropdownList.scss";
import ColorSelector from "./ColorSelector";
import UserProfile from "./UserProfile";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const SettingsList: React.FC = () => {
    const blockRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const router = useRouter();
    const handleRouteSelect = () => {
        router.push(`/login/`)
    }

    const handleSelect = () => {
        setIsFocused(!isFocused);
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
        <div className='header-element settings-block' ref={blockRef}>
            <div className={`skeumorphic-bg ${isFocused ? "active-btn" : "inactive-btn"}`} onClick={() => handleSelect()}>
                <button className='settings-btn'>
                    <SettingsSVG />
                </button>
            </div>
            <div className={`dropdown-list-wrapper setting-options ${isFocused ? "active" : "inactive"}`} ref={listRef}>
                <ColorSelector />
                <ThemeToggle/>
                <UserProfile />
                <Button label="Log In" onClick={() => handleRouteSelect()} className="login-btn" icon={<LogInSVG />} iconPosition="right" />
            </div>
        </div>
    );
};

export default SettingsList;