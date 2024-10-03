'use client'; // Ensure this is a client-side component

import React from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname for current route

const Sidebar: React.FC = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="fixed h-full w-60 bg-secondary text-white flex flex-col">
      <div className="p-6 text-2xl mt-10 font-bold uppercase">
        Volet Store
      </div>
      <hr className="w-2/3 ml-6 border-t-2 border-gray-300" />
      <nav className="flex-grow">
        <ul className="py-4">
          <li>
            <a
              href="/"
              className={`block pl-6 p-2 hover:bg-white hover:text-black active:bg-white ${
                pathname === '/' ? 'bg-white text-black' : ''
              }`}
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="/deviscrees"
              className={`block pl-6 p-2 hover:bg-white hover:text-black active:bg-white ${
                pathname === '/deviscrees' ? 'bg-white text-black' : ''
              }`}
            >
              Devis créés
            </a>
          </li>
          <li>
            <a
              href="/commandes"
              className={`block pl-6 p-2 hover:bg-white hover:text-black active:bg-white ${
                pathname === '/commandes' ? 'bg-white text-black' : ''
              }`}
            >
              Mes Commandes
            </a>
          </li>
          <li>
            <a
              href="/adresse"
              className={`block pl-6 p-2 hover:bg-white hover:text-black active:bg-white ${
                pathname === '/adresse' ? 'bg-white text-black' : ''
              }`}
            >
              Adresse
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
