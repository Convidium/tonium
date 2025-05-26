import React, { useEffect, useRef, useState } from "react";
import "@/app/ui/styles/ui-components/UserProfile.scss";
import UserSVG from "@/app/ui/icons/user-default.svg";
import ExpandSVG from "@/app/ui/icons/expand.svg";

const UserProfile: React.FC = () => {

    return (
        <div className="user-profile-wrapper">
            <span>User Profile</span>
            <div className="user-profile">
                <div className="logo-picture">
                    <UserSVG />
                </div>
                <div className="user-desription">
                    <div className="user-name">My Name</div>
                    <div className="user-email">somename@gmail.com</div>
                </div>
            </div>
            <div className="user-buttons">
                <button className="user-btn">
                    <span>More</span>
                </button>
                <button className="user-btn">
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default UserProfile;