'use client';
import React from 'react'
import "@/app/ui/styles/profile/profile.scss"
import Button from '@/app/components/UI/Button';
import UserLogoSVG from "@/app/ui/icons/user-default-2.svg";

function ProfilePage() {
  return (
    <div className='profile-wrapper'>
      <div className='profile-block'>
        <div className='profile-logo-section'>
          <div className='profile-circle'>
            <UserLogoSVG/>
          </div>
        </div>
        <div className='profile-info-section'>
          <div className='profile-name'></div>
          <div className='profile-email'></div>
        </div>
        <div className='profile-navigation'>
          <div className='profile-edit'></div>
          <div className='profile-log-out'>
            <Button label="Log out" onClick={() => console.log("User wants to log out")}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;