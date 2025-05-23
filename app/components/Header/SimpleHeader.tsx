'use client';
import React from 'react'
import "@/app/ui/header.scss";
import LogoSVG from "@/app/ui/icons/Logo.svg";

function SimpleHeader() {
  return (
    <div className='header-wrapper simple-header'>
      <div className='header-element logo-block'>
        <button className='logo-btn'>
          <LogoSVG />
        </button>
      </div>
    </div>
  )
}

export default SimpleHeader;