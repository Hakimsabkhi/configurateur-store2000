// src/app/configurateur/layout.tsx


import React, { ReactNode } from 'react';

interface ConfigurateurLayoutProps {
  children: ReactNode;
}

const ConfigurateurLayout: React.FC<ConfigurateurLayoutProps> = ({ children }) => {
  
  return (
    <div className="flex flex-col gap-10 w-full h-screen">
      <main>{children}</main>
    </div>
  );
};

export default ConfigurateurLayout;
