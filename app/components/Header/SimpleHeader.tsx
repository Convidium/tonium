'use client';
import React from 'react'
import "@/app/ui/header.scss";
import LogoSVG from "@/app/ui/icons/Logo.svg";
import { useRouter } from 'next/navigation';

function SimpleHeader() {
  const router = useRouter();
  const handleRouteSelect = () => {
    router.push(`/`);
  }
  return (
    <div className='header-wrapper simple-header'>
      <div className='header-element logo-block'>
        <button className='logo-btn' onClick={() => handleRouteSelect()}>
          <LogoSVG />
        </button>
      </div>
    </div>
  )
}

export default SimpleHeader;