'use client';
import React, { useState } from 'react'; // Import useState
import "@/app/ui/header.scss";
import CollectionSVG from "@/app/ui/icons/Collection.svg";
import LogoSVG from "@/app/ui/icons/Logo.svg";
import SearchBar from './SearchBar';
import CreateDropdownList from './CreateDropdownList';
import SettingsList from '../Settings/SettingsList';
import { useRouter } from 'next/navigation';
import CollectionSidebar from '../Sidebar/Sidebar';

const FullHeader = ( ) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const handleRouteSelect = () => {
    router.push(`/`);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className='header-wrapper'>
        <div className='header-element collection-block'>
          <div className='skeumorphic-bg-accent'>
            <button className={`expand-collection-btn ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar}>
              <CollectionSVG />
            </button>
          </div>
        </div>
        <div className='header-element logo-block'>
          <button className='logo-btn' onClick={() => handleRouteSelect()}>
            <LogoSVG />
          </button>
        </div>
        <SearchBar />
        <CreateDropdownList />
        <SettingsList />
      </div>
      <CollectionSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && <div className="overlay"></div>}
    </>
  )
}

export default FullHeader;