'use client';
import React from 'react'
import "@/app/ui/header.scss";
import CollectionSVG from "@/app/ui/icons/Collection.svg";
import LogoSVG from "@/app/ui/icons/Logo.svg";
import SearchBar from './SearchBar';
import CreateDropdownList from './CreateDropdownList'
import SettingsList from '../Settings/SettingsList';
import { useRouter } from 'next/navigation';

function FullHeader() {
  const router = useRouter();
  const handleRouteSelect = () => {
    router.push(`/`);
  }
  return (
    <div className='header-wrapper'>
      <div className='header-element collection-block'>
        <div className='skeumorphic-bg-accent'>
          <button className='expand-collection-btn' onClick={() => handleRouteSelect()}>
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
      <CreateDropdownList />
      <SettingsList />
    </div>
  )
}

export default FullHeader;