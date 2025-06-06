'use client';
import React from 'react'
import "@/app/ui/header.scss";
import { usePathname } from "next/navigation";
import FullHeader from "@/app/components/Header/FullHeader";
import SimpleHeader from "@/app/components/Header/SimpleHeader";

const simplePagesURL = ["/login", "/sign-in"];

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const pathname = usePathname();
  return (
    simplePagesURL.includes(pathname)
      ? <SimpleHeader/>
      : <FullHeader />
  )
}

export default Header;