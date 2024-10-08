import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../store/voletSlice';
import { ColorImages } from '../../assets/Data';
import { RootState } from '../../store'; 
import useMediaQuery from './useMediaQuery';
import { SelectedColor } from "../../types/interfaces";

interface CouleurVoletProps {
  enableNextButton: (isEnabled: boolean) => void;
}


const CouleurVolet: React.FC<CouleurVoletProps> = ({enableNextButton}) => {
  const dispatch = useDispatch(); 
  const selectedColors: SelectedColor = useSelector((state: RootState) => state.volet.selectedColor);
  const isMobile = useMediaQuery('(max-width: 1050px)');
  const [loading, setLoading] = useState(false);
  const [visibleSection, setVisibleSection] = useState<keyof SelectedColor>('coulisse');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const allSelected = Object.keys(ColorImages).every(
      (category) =>
        selectedColors[category as keyof SelectedColor] && selectedColors[category as keyof SelectedColor] !== ''
    );
    enableNextButton(allSelected);
  
    if (allSelected) {
      setIsConfigured(true);
    } else {
      setIsConfigured(false);
    }
  }, [selectedColors, enableNextButton]); // Add enableNextButton and selectedColors to the dependency array
  

  const handleColorSelection = (colorName: string, category: keyof SelectedColor) => {
    if (isMobile) {
      setLoading(true);
      setTimeout(() => {
        dispatch(setColor({ color: colorName, category }));
        setLoading(false);
        if (category === 'coulisse') setVisibleSection('tablier');
        if (category === 'tablier') setVisibleSection('lameFinale');
        if (category === 'lameFinale') setIsConfigured(true);
      }, 1000); // Simulate loading delay
    } else {
      dispatch(setColor({ color: colorName, category }));
      if (category === 'coulisse') setVisibleSection('tablier');
      if (category === 'tablier') setVisibleSection('lameFinale');
      if (category === 'lameFinale') setIsConfigured(true);
    }
  };

  const handleReconfigure = () => {
    setIsConfigured(false);
    setVisibleSection('coulisse');
    // Optionally reset selected colors
    dispatch(setColor({ color: '', category: 'coulisse' }));
    dispatch(setColor({ color: '', category: 'tablier' }));
    dispatch(setColor({ color: '', category: 'lameFinale' }));
  };

  const renderColorChoices = (category: keyof SelectedColor) => {
    const colors = ColorImages[category] || {};
    return Object.entries(colors).map(([colorName, colorCode]) => (
      <div
        key={`${category}-${colorName}`}
        className={`rounded-full border-secondary ${colorName === selectedColors[category] ? "selected flex-[1_0_30%] flex flex-col justify-center items-center gap-[5px] text-center text-[12px] p-[5px] cursor-pointer rounded-[3px] border-2 text-cblack border-cwhite bg-primary text-cText font-bold "
          : "flex-[1_0_30%] flex flex-col justify-center items-center gap-[5px] text-center text-[12px] p-[5px] cursor-pointer rounded-[3px] border-2 border-cwhite bg-secondary hover:text-cblack max-md:text-[10px] "
      }`}
        onClick={() => handleColorSelection(colorName, category)}
        style={{ cursor: 'pointer', textAlign: 'center' }}
      >
        <input
          type="checkbox"
          id={`label-${colorName}-${category}`}
          name={`color-${category}`}
          value={colorName}
          checked={colorName === selectedColors[category]}
          onChange={() => {}} 
          aria-labelledby={`label-${colorName}-${category}`}
          className="hidden"
          required
        />
        <div>
          <span>{colorName.replace(/-/g, ' ')}</span>
        </div>
      </div>
    ));
  };

  const renderSection = (section: keyof SelectedColor, title: string) => (

      <div className="flex flex-col justify-center gap-2">
        {loading ? (
          <div className="border-4 gap-2 border-solid border-cwhite border-t-4 border-t-secondary rounded-full w-10 h-10 animate-spin mx-auto"></div>
        ) : (
          <>
          <h3 className="text-sm font-bold max-md:text-center text-cText ">{title}</h3>
          <div className="flex justify-center flex-wrap gap-[5px]">{renderColorChoices(section)}</div>
          </>        
        )}
      </div>
  );

  return (
    <div className="w-full flex flex-col gap-8 justify-around max-lg:min-h-[80px]  ">
      {isMobile && isConfigured ? (
        <div className="flex flex-col justify-center items-center text-cwhite text-center gap-[5px]">
          <p className='text-cText font-bold text-xs'>Votre volet est bien colorisé</p>
          <button onClick={handleReconfigure} className="nav-btn rounded-full text-sm font-bold max-lg:py-4 max-lg:w-[50%]">Recoloriser</button>
        </div>
      ) : (
        <>
          {(!isMobile || visibleSection === 'coulisse') && renderSection('coulisse', 'Couleurs de Coffre et Coulisse')}
          {(!isMobile || visibleSection === 'tablier') && renderSection('tablier', 'Couleurs de Tablier')}
          {(!isMobile || visibleSection === 'lameFinale') && renderSection('lameFinale', 'Couleurs de Lame Finale')}
        </>
      )}
    </div>
  );
};
export default CouleurVolet;
