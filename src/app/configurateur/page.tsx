

"use client";

import React, {useState, Suspense } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from '../../store'; // Adjust the import path according to your project structure
import Viewer from '../../components/sketchfab/Viewer';


const ConfigurateurContent: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full text-[#fff]">
      <Viewer setPosition={setPosition} setTarget={setTarget} />
    </div>
  );
};

const WrappedConfigurateur: React.FC = () => (
  <Provider store={store}>
    <Suspense fallback={<div>Loading configuration...</div>}>
      <ConfigurateurContent />
    </Suspense>
  </Provider>
);

export default WrappedConfigurateur;
