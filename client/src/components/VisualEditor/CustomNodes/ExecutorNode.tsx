import { Handle, NodeToolbar, Position } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import IconOnlyButton from "../../Widgets/Buttons/IconOnlyButton";
import { LuTableProperties } from "react-icons/lu";
import {
  getActiveEntity,
  setActiveEntity,
} from "../../../redux/activeEntity/activeEntitySlice";

type ExecutorNodeProps = {
  selected: boolean | undefined;
  data: {
    label: string;
    executor: any;
  };
};

export default function ExecutorNode({
  selected,
  data,
}: ExecutorNodeProps | any) {
  const dispatch = useDispatch();
  const executorName: string = data.executor[0];
  const executorData: any = data.executor[1];
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
              <LuTableProperties className="text-gray-500 dark:text-gray-400" />
            }
            onClick={() => {
              dispatch(
                setSelectedEntity({ type: "executor", entity: data.executor })
              );
            }}
          />
        </div>
      </NodeToolbar>
      <Handle type="source" position={Position.Top} />

      <div
        className={`h-fit w-fit rounded-tl-[20px] rounded-br-[20px] flex flex-col items-center py-2 px-4 bg-orange-400/40
          ${
            (activeEntity.type === "executor" &&
              activeEntity?.entity[0] === executorName) ||
            (activeEntity.type === "job" &&
              activeEntity?.entity[1]?.executor === executorName)
              ? "opacity-100"
              : "opacity-50"
          }
          ${
            !(selected === false || selected === undefined)
              ? "border-2 border-blue-500"
              : "border-[1px] border-orange-400"
          }`}
        onClick={() => {
          dispatch(
            setActiveEntity({ type: "executor", entity: data.executor })
          );
        }}
      >
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Executor
        </p>
        <p className="text-xs text-gray-800 dark:text-gray-300">
          {executorName}
        </p>
        <div className="flex flex-row gap-4 justify-between items-center my-2">
          <p className="text-xs text-gray-800 font-medium dark:text-gray-300">
            Image:
          </p>
          <p className="text-xs text-gray-800 dark:text-gray-300 bg-orange-400/40 p-1 rounded w-fit h-fit max-w-[200px]">
            {executorData?.docker[0]["image"]}
          </p>
        </div>
      </div>
    </>
  );
}
