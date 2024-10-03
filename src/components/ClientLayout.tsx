"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import CreateDevisButton from '@/components/CreateDevisButton';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  
  const excludedPaths = ['/configurateur'];

  if (excludedPaths.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
    <CreateDevisButton />    
          {children}
    </>
          );
};

export default ClientLayout;
