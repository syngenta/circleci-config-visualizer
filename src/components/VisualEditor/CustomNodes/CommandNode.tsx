import { Handle, NodeToolbar, Position } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import IconOnlyButton from "../../Widgets/Buttons/IconOnlyButton";
import { LuTableProperties } from "react-icons/lu";
import {
  getActiveEntity,
  setActiveEntity,
} from "../../../redux/activeEntity/activeEntitySlice";
import checkIfCommandExistsInJob from "./checkIfCommandExistsInJob";

type CommandNodeProps = {
  selected: boolean | undefined;
  data: any;
};

export default function CommandNode({
  selected,
  data,
}: CommandNodeProps | any) {
  const commandName: string = data.command[0];
  const commandData: any = data.command[1];
  const commandDescription: string = commandData.description;
  const dispatch = useDispatch();
  const activeEntity = useSelector(getActiveEntity);

  return (
    <>
      <NodeToolbar
        isVisible={!(selected === false || selected === undefined)}
        position={Position.Top}
      >
        <div className="bg-white dark:bg-gray-800 p-1 border-[1px] border-gray-300 dark:border-gray-700 rounded shadow-lg flex flex-row gap-2">
          <IconOnlyButton
            icon={
              <LuTableProperties className="text-gray-500  dark:text-gray-400" />
            }
            onClick={() => {
              dispatch(
                setSelectedEntity({ type: "command", entity: data.command })
              );
            }}
          />
        </div>
      </NodeToolbar>
      <Handle type="source" position={Position.Top} />
      <div
        className={`h-fit max-h-[300px] overflow-scroll scroll w-[350px] rounded-tl-[20px] rounded-br-[20px] flex flex-col items-center py-4 px-4 bg-red-400/40 dark:bg-red-700/40 ${
          (activeEntity?.type === "job" &&
            checkIfCommandExistsInJob(commandName, activeEntity?.entity[1])) ||
          (activeEntity?.type === "command" &&
            activeEntity?.entity[0] === commandName)
            ? "opacity-100"
            : "opacity-50"
        } ${
          !(selected === false || selected === undefined)
            ? "border-2 border-blue-500"
            : "border-[1px] border-red-400"
        }`}
        onClick={() => {
          dispatch(setActiveEntity({ type: "command", entity: data.command }));
        }}
      >
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Command
        </p>
        <div className="flex flex-col justify-start items-start mt-4 gap-2 w-full">
          <div className="w-full flex flex-col justify-start items-start dark:text-gray-300">
            <p className="text-xs font-medium">{commandName}</p>
            <p className="text-[10px] text-gray-700 dark:text-gray-300">
              {commandDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
