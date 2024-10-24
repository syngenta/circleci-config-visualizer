import { useEffect, useRef, useState } from "react";
import ReactJson from "react-json-view";
import { useSelector } from "react-redux";
import { getDarkMode } from "../../../redux/darkMode/darkModeSlice";

type StepsProps = {
  selectedEntity: any;
  stepsProps: any[];
};

export default function Steps({ stepsProps, selectedEntity }: StepsProps) {
  const [steps, setSteps] = useState<any[]>([]);
  const [newStep, setNewStep] = useState<{ type?: string; step?: any } | null>(
    null
  );
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const darkMode = useSelector(getDarkMode);
  const stepsContainerRef = useRef<any>(null);

  const setMenuItems = () => {
    const menuItems = [
      {
        label: "Orb step",
        onClick: () => {
          setNewStep({ type: "orb", step: {} });
          setMenuPosition(null);
        },
      },
      {
        label: "Custom step",
        onClick: () => {
          setNewStep({
            type: "custom",
            step: { run: { name: "", command: "" } },
          });
          setMenuPosition(null);
        },
      },
    ];
    return menuItems;
  };

  useEffect(() => {
    setSteps(stepsProps);
  }, [stepsProps]);

  useEffect(() => {
    setNewStep(null);
  }, [selectedEntity]);

  useEffect(() => {
    if (stepsContainerRef.current) {
      stepsContainerRef.current.scrollTop =
        stepsContainerRef.current.scrollHeight;
    }
  }, [newStep]);

  return (
    <div className="">
      <div
        ref={stepsContainerRef}
        className="mt-6 border-t-[1px] border-gray-300 dark:border-gray-700 h-[400px] overflow-scroll scroll pb-6"
      >
        {steps.map((step) => {
          return (
            <div className="border-b-[1px] border-gray-300 dark:border-gray-700 py-4 px-2">
              {typeof step === "string" ? (
                <p className="text-sm text-gray-700 dark:text-gray-300  ">
                  {step}
                </p>
              ) : (
                <div>
                  <ReactJson
                    theme={darkMode ? "ocean" : "rjv-default"}
                    src={step}
                    name={false}
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    validationMessage="Error"
                    quotesOnKeys
                    style={{ fontSize: 12, borderRadius: 5, padding: 10 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
