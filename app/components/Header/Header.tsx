import React from 'react'
import "@/app/ui/header.scss";
import CollectionSVG from "@/app/icons/Collection.svg";
import LogoSVG from "@/app/icons/Logo.svg";
import SettingsSVG from "@/app/icons/Settings.svg";
import CreateSVG from "@/app/icons/AddNew.svg";
import SearchBar from './SearchBar';

function Header() {
  return (
    <div className='header-wrapper'>
      <div className='header-element collection-block'>
        <div className='skeumorphic-bg-accent'>
          <button className='expand-collection-btn active'>
            <CollectionSVG />
          </button>
        </div>
      </div>
      <div className='header-element logo-block'>
        <button className='logo-btn'>
          <LogoSVG />
        </button>
      </div>
      <SearchBar />
      <div className='header-element create-block'>
        <div className='skeumorphic-bg'>
          <button className='create-btn'>
            <CreateSVG />
            <span>Create</span>
          </button>
        </div>
      </div>
      <div className='header-element settings-block'>
        <div className='skeumorphic-bg'>
          <button className='settings-btn'>
            <SettingsSVG />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header;