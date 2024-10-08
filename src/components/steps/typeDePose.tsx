import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPoseInstalled, selectPoseInstalled } from "../../store/voletSlice";
import { poseOptions } from "../../assets/Data";
import { TypeDePoseProps } from "../../types/interfaces";
import Image from "next/image";

function TypeDePose({ enableNextButton }: TypeDePoseProps) {
  const dispatch = useDispatch();
  const poseInstalled = useSelector(selectPoseInstalled);
  const [hoveredChoice, setHoveredChoice] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  useEffect(() => {
    enableNextButton(poseInstalled !== "");
  }, [poseInstalled, enableNextButton]);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLLabelElement>,
    choice: any
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const translateYValue = window.innerHeight * 0.12; // 12% of viewport height
    setPopupPosition({
      top: rect.top + window.scrollY - translateYValue,
      left: rect.left + rect.width,
    });
    setHoveredChoice(choice);
  };

  return (
    <div>
      <div className="flex flex-col justify-center gap-[5px]">
        {poseOptions.map((choice) => (
          <label
            key={choice.label}
            className={`border-2 border-secondary rounded-[16px] max-lg:text-xs max-lg:justify-center ${
              choice.label === poseInstalled
                ? "selected flex text-[#000] bg-[#fff] p-[6px] gap-[20px] cursor-pointer font-bold"
                : "flex bg-secondary p-[6px] gap-[20px] cursor-pointer hover:bg-cwhite"
            }`}
            onMouseEnter={(e) => handleMouseEnter(e, choice)}
            onMouseLeave={() => setHoveredChoice(null)}
          >
            <Image
              src={choice.image}
              alt={choice.label}
              width={100}
              height={100}
              className="h-auto rounded-[16px] w-[15%] max-2xl:rounded-[3px] max-md:hidden"
              style={{ objectFit: "contain" }}
              quality={75}
            />

            <div className="flex flex-col justify-center items-center text-center gap-[5px]">
              <div>
                <h3 className="">{choice.label}</h3>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={choice.label === poseInstalled}
                  id={`checkbox-${choice.label}`}
                  onChange={() => dispatch(setPoseInstalled(choice.label))}
                  required
                />
                <label htmlFor={`checkbox-${choice.label}`}></label>
              </div>
              <p className="text-xs max-xl:text-xs font-extralight max-md:hidden text-center">
                {choice.description}
              </p>
            </div>
          </label>
        ))}
      </div>
      {hoveredChoice && (
        <div
          className="popup-info max-lg:hidden"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
        >
          <h2 className="text-sm uppercase font-semibold">
            {hoveredChoice.label}
          </h2>
          <Image
            src={hoveredChoice.image}
            alt={hoveredChoice.label}
            width={100}
            height={100}
            className="max-md:hidden"
            quality={75}
            // Load the hovered image eagerly for a better UX
            loading="eager"
            style={{ objectFit: "contain" }}
          />
          <p className="text-xs">{hoveredChoice.description}</p>
        </div>
      )}
    </div>
  );
}

export default TypeDePose;
