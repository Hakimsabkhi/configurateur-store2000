import React, { useState, useRef, useEffect, useMemo } from "react";
import { OverlayButtonsProps } from "../../types/interfaces";;
import { FaRegEye } from 'react-icons/fa';
import { BiArrowToLeft } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import { BiArrowToRight } from 'react-icons/bi';
import { BiRotateRight } from 'react-icons/bi';
import { FaPauseCircle } from 'react-icons/fa';


const OverlayButtons: React.FC<OverlayButtonsProps> = ({
  handleViewChange,
}) => {
  const [rotating, setRotating] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const angleRef = useRef(0);

  const initialPosition: [number, number, number] = useMemo(() => [
    2.6201731305279115, 1.7391765218021726, 2.246155724912089
  ], []);

  const target: [number, number, number] = useMemo(() => [
    2.75994561822201, -7.499899150251758, 0.9226961492658463
  ], []);

  useEffect(() => {
    const dx = initialPosition[0] - target[0];
    const dy = initialPosition[1] - target[1];
    angleRef.current = Math.atan2(dy, dx);
  }, [initialPosition, target]);

  const handleOutsideView = () => {
    console.log("Setting camera to Outside View");
    handleViewChange(initialPosition, target, 2, (err) => {
      if (!err) {
        console.log("Camera moved to Outside View");
      } else {
        console.error("Failed to move camera:", err);
      }
    });
  };

  const handleInsideView = () => {
    console.log("Setting camera to Inside View");
    const position: [number, number, number] = [
      1.811144392228786, -14.558845380838822, 2.5453836829150656,
    ];
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log("Camera moved to Inside View");
      } else {
        console.error("Failed to move camera:", err);
      }
    });
  };

  const handleOSideView = () => {
    console.log("Setting camera to Side View");
    const position: [number, number, number] = [
      -5.735331983069596, -3.86881459294267, 2.165414486293953,
    ];
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log("Camera moved to Side View");
      } else {
        console.error("Failed to move camera:", err);
      }
    });
  };

  const handleISideView = () => {
    console.log("Setting camera to Side View");
    const position: [number, number, number] = [
      9.731598827040276, -11.44004813850311, 1.9196426127094297,
    ];
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log("Camera moved to Side View");
      } else {
        console.error("Failed to move camera:", err);
      }
    });
  };

  const targetAutorotation: [number, number, number] = [
    2.754840408791274, -7.138095141931463, 2.246155724912089,
  ]; // New target coordinates

  const targetRotation = () => {
    const radius = 7; // Set the radius distance from the target

    const x = targetAutorotation[0] + radius * Math.cos(angleRef.current);
    const y = targetAutorotation[1] + radius * Math.sin(angleRef.current);
    const z = targetAutorotation[2];

    const position: [number, number, number] = [x, y, z];

    handleViewChange(position, targetAutorotation, 0.5);
    angleRef.current += Math.PI / 180;
  };

  const toggleRotation = () => {
    if (rotating) {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
      setRotating(false);
      setButtonsDisabled(false);
    } else {
      rotationIntervalRef.current = setInterval(targetRotation, 100);
      setRotating(true);
      setButtonsDisabled(true);
    }
  };

  return (
    <div className="fixed max-md:hidden bottom-[5%] left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-row gap-[3%] w-[50%] h-[50px] justify-center">
      <button
        onClick={handleOutsideView}
        className="w-[50px] h-[50px] border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-full transition-shadow hover:bg-cwhite focus:bg-cwhite"
        disabled={buttonsDisabled}
      >
        <FaRegEye size={34} />
      </button>
      <button
        onClick={handleInsideView}
        className="w-[50px] h-[50px] border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-full transition-shadow hover:bg-cwhite focus:bg-cwhite"
        disabled={buttonsDisabled}
      >
        <FiEye size={34} />
      </button>
      <button
        onClick={handleOSideView}
        className="w-[50px] h-[50px] border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-full transition-shadow hover:bg-cwhite focus:bg-cwhite"
        disabled={buttonsDisabled}
      >
        <BiArrowToRight size={34} />
      </button>
      <button
        onClick={handleISideView}
        className="w-[50px] h-[50px] border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-full transition-shadow hover:bg-cwhite focus:bg-cwhite"
        disabled={buttonsDisabled}
      >
         <BiArrowToLeft size={34} />
      </button>
      <button 
      onClick={toggleRotation} 
      className="w-[50px] h-[50px] border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-full transition-shadow hover:bg-cwhite focus:bg-cwhite"
    >
      {rotating ? <FaPauseCircle size={34} /> : <BiRotateRight size={34} />}
    </button>
    </div>
  );
};

export default OverlayButtons;
