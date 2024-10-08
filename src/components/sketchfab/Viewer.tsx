import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectPoseInstalled } from "../../store/voletSlice";
import OverlayButtons from "./OverlayButtons";
import TextureUpdater from "./TextureUpdater";
import APIDataFetcher from "./APIDataFetcher";
import useScript from "../../hooks/useScript";
import { ViewerProps } from "../../types/interfaces";
import LoadingScreen from "../LoadingScreen";
import ConfiguratorMenu from "../ConfiguratorMenu";
import { RiSettings3Fill } from 'react-icons/ri';




const Viewer: React.FC<ViewerProps> = ({ setPosition, setTarget }) => {
  const [coulisseTexture, setCoulisseTexture] = useState(
    "33b7f13018224606a347dc752a5bf9e5"
  );
  const [tablierTexture, setTablierTexture] = useState(
    "cec33a451ee5427687bfb05f847cdf09"
  );
  const [lameFinaleTexture, setLameFinaleTexture] = useState(
    "9a7c42640fa244fc828f6bb88c6b24ca"
  );
  const [menuVisible, setMenuVisible] = useState(false);

  const poseInstalled = useSelector(selectPoseInstalled);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiClientRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastStepId, setLastStepId] = useState(1);

  const scriptLoaded = useScript(
    "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js",
    () => {
      console.log("Sketchfab API script loaded");
    }
  );

  const initializeViewer = useCallback(() => {
    if (!scriptLoaded || !iframeRef.current) return;
    let intervalId: NodeJS.Timeout | null = null;
    const iframe = iframeRef.current;
    const client = new window.Sketchfab(iframe);
    client.init("231bc663e779447faddce738c2d66fde", {
      success: (api: any) => {
        api.start({ preload: 1 });
        api.addEventListener("viewerready", () => {
          console.log("Viewer is ready");
          apiClientRef.current = api;

          const initialPosition: [number, number, number] = [
            2.5178205094906034, 8.60986258081088, 0.9247225003590656,
          ];
          const initialTarget: [number, number, number] = [
            2.75994561822201, -7.499899150251758, 0.9226961492658471,
          ];
          api.setCameraLookAt(initialPosition, initialTarget, 6, (err: any) => {
            if (err) {
              console.error("Failed to set initial camera position:", err);
            } else {
              console.log("Initial camera position set");
            }
          });

          const updateCameraDetails = () => {
            api.getCameraLookAt((err: any, cameraLookAt: any) => {
              if (!err) {
                setPosition({
                  x: cameraLookAt.position[0],
                  y: cameraLookAt.position[1],
                  z: cameraLookAt.position[2],
                });
                setTarget({
                  x: cameraLookAt.target[0],
                  y: cameraLookAt.target[1],
                  z: cameraLookAt.target[2],
                });
              }
            });
          };
          updateCameraDetails();
          intervalId = setInterval(updateCameraDetails, 5000);

          api.hide(3, (err: any) => {
            if (!err) console.log("Node 3 is initially hidden");
            else console.error("Failed to hide node 3:", err);
          });

          api.hide(182, (err: any) => {
            if (!err) console.log("Node 182 is initially hidden");
            else console.error("Failed to hide node 182:", err);
          });

          api.show(97, (err: any) => {
            if (!err) console.log("Node 97 is initially shown");
            else console.error("Failed to show node 97:", err);
          });

          // Hide the loading cover after 2 seconds
          window.setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        });
      },
      error: () => console.error("Sketchfab API failed to initialize"),
      preload: 1,
      autostart: 1,
      camera: 0,
      ui_animations: 0,
      ui_infos: 0,
      ui_stop: 0,
      ui_inspector: 0,
      ui_watermark_link: 0,
      ui_watermark: 0,
      ui_help: 0,
      ui_settings: 0,
      ui_annotations: 0,
      prevent_user_light_rotation: 1,
      ui_controls: 0,
    });
  }, [scriptLoaded, setPosition, setTarget]);

  useEffect(() => {
    initializeViewer();
  }, [initializeViewer]);

  const handleViewChange = (
    position: [number, number, number],
    target: [number, number, number],
    duration: number = 5,
    callback?: (err: any) => void
  ) => {
    if (apiClientRef.current) {
      apiClientRef.current.setCameraLookAt(
        position,
        target,
        duration,
        (err: any) => {
          if (callback) callback(err);
          if (err) console.error("Failed to set camera look at:", err);
        }
      );
    }
  };

  useEffect(() => {
    if (apiClientRef.current) {
      const showHideNodes = (showNodes: number[], hideNodes: number[]) => {
        showNodes.forEach((nodeId) => {
          apiClientRef.current.show(nodeId, (err: any) => {
            if (err) console.error(`Failed to show node ${nodeId}:`, err);
          });
        });

        hideNodes.forEach((nodeId) => {
          apiClientRef.current.hide(nodeId, (err: any) => {
            if (err) console.error(`Failed to hide node ${nodeId}:`, err);
          });
        });
      };

      if (poseInstalled === "En applique") {
        showHideNodes([3], [97, 182]);
      } else if (poseInstalled === "Sous lanteau") {
        showHideNodes([97], [3, 182]);
      } else if (poseInstalled === "Sous lanteau inverse") {
        showHideNodes([182], [3, 97]);
      }
    }
  }, [poseInstalled]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSelectionsChange = (selections: any) => {
    // Handle changes in selections here
    console.log(selections);
  };

  const handleStepChange = (stepId: number) => {
    setLastStepId(stepId); // Update the last step reached
  };


  return (
    <div className="absolute w-full h-full">
      {isLoading && <LoadingScreen />}
      <iframe
        id="sketchfab-viewer"
        ref={iframeRef}
        className="w-full h-full"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        xr-spatial-tracking="false"
        execution-while-out-of-viewport="true"
        execution-while-not-rendered="true"
        web-share="true"
      ></iframe>
      {!isLoading && (
        <>
          <OverlayButtons handleViewChange={handleViewChange} />
          <TextureUpdater
            apiClient={apiClientRef.current}
            textureType="coulisse"
            textureId="fd81e75a-b2e0-4810-a6b2-75ecc2642917"
            setTexture={setCoulisseTexture}
          />
          <TextureUpdater
            apiClient={apiClientRef.current}
            textureType="tablier"
            textureId="92eecb9c-a382-464a-8734-cb2cab58f5ee"
            setTexture={setTablierTexture}
          />
          <TextureUpdater
            apiClient={apiClientRef.current}
            textureType="lameFinale"
            textureId="c1b65b55-ff79-473e-b744-bd0403d80962"
            setTexture={setLameFinaleTexture}
          />
          <APIDataFetcher apiClient={apiClientRef.current} />

          <div className="fixed flex flex-col gap-4 top-[3%] left-[3%] max-lg:top-[0] w-[30%] h-[80%] max-lg:w-full max-lg:h-full max-lg:left-1/2 max-lg:transform max-lg:-translate-x-1/2 max-lg:justify-between bg-blend-overlay  inset-0 pointer-events-none">
            <div className=" mt-4 flex gap-[5%] justify-center items-center pointer-events-auto ">
              <button
                className="w-[50px] h-[50px] border-none cursor-pointer flex items-center justify-center bg-cbutton shadow-[0_2px_6px_rgba(0,0,0,0.952)] rounded-full transition-shadow hover:bg-cwhite focus:bg-cwhite"
                onClick={toggleMenu}
              >
               <RiSettings3Fill size={34} />
              </button>
              <h2 className="flex items-center text-2xl max-2xl:text-xl max-xl:text-base max-lg:text-base max-md:text-sm w-fit h-full uppercase font-semibold">
                Configurer mon volet
              </h2>
            </div>
            {menuVisible && (      
                  <ConfiguratorMenu
                  onSelectionsChange={handleSelectionsChange}
                  initialStep={lastStepId} // Pass the last step reached to the menu
                  onStepChange={handleStepChange} // Pass the step change handler
                />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Viewer;
