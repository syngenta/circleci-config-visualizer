import { useState } from "react";
import InputBox from "../../Widgets/InputBox/InputBox";
import Divider from "../../Widgets/Divider/Divider";
import { useSelector } from "react-redux";
import { getSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import objToArrayConverter from "../../../utils/objToArrayConverter";
import Parameters from "./Parameters";
import EnvironmentVars from "./EnvironmentVars";
import Steps from "./Steps";

export default function JobProperties() {
  const selectedEntity = useSelector(getSelectedEntity);
  const [tabs, setTabs] = useState(["Properties", "Steps"]);
  const [openTab, setOpenTab] = useState("Properties");

  return (
    <div className="">
      <p className="text-[40px] text-gray-600 dark:text-gray-300 font-medium">Job</p>
      <p className="text-[20px] text-gray-700 dark:text-gray-400 font-medium">
        {selectedEntity.entity[0]}
      </p>
      <div className="flex flex-row items-center gap-4 my-4">
        <p className="text-[15px] text-gray-700 dark:text-gray-300 font-medium">
          {selectedEntity.entity[1].executor ? "Executor:" : "Docker:"}
        </p>
        <InputBox
          type="text"
          value={
            selectedEntity.entity[1].executor
              ? selectedEntity.entity[1].executor
              : selectedEntity.entity[1].docker[0].image
          }
          onChange={() => {}}
        />
      </div>
      <div className="flex flex-row items-center my-8">
        {tabs.map((tab, key) => (
          <button className={`p-2 px-4 border-b-[3px] ${openTab===tab?" border-blue-500":"border-transparent"}`} key={key} onClick={()=>{setOpenTab(tab)}}>
            <p className="text-sm text-gray-700 dark:text-gray-300">{tab}</p>
          </button>
        ))}
      </div>

      {openTab === "Properties" ? (
        <>
          <Parameters
            selectedEntity={selectedEntity.entity[1]}
            parametersProps={selectedEntity.entity[1].parameters}
          />

          <Divider />

          <EnvironmentVars
            selectedEntity={selectedEntity.entity[1]}
            envVarsProps={selectedEntity.entity[1].environment}
            parameters={objToArrayConverter(
              selectedEntity.entity[1].parameters
            ).map((param) => {
              return param[0];
            })}
          />
        </>
      ):<Steps selectedEntity={selectedEntity.entity[1]}
      stepsProps={selectedEntity.entity[1].steps} />}
    </div>
  );
}
