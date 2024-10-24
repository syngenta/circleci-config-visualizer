import { Handle, NodeToolbar, Position } from "@xyflow/react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import { getAllOrbs } from "../../../redux/data/dataSlice";
import IconOnlyButton from "../../Widgets/Buttons/IconOnlyButton";
import { LuTableProperties } from "react-icons/lu";

type OrbNodeProps = {
  selected: boolean | undefined;
  data: any;
};

export default function OrbNode({ selected, data }: OrbNodeProps | any) {
  const orbs = useSelector(getAllOrbs);
  const dispatch = useDispatch();

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
              dispatch(setSelectedEntity({ type: "orb", entity: orbs }));
            }}
          />
        </div>
      </NodeToolbar>
      <Handle type="source" position={Position.Top} />
      <div
        className={`h-fit w-fit rounded-tl-[20px] rounded-br-[20px] flex flex-col items-center py-4 px-4 bg-violet-400/40 dark:bg-violet-700/40 ${
          !(selected === false || selected === undefined)
            ? "border-2 border-blue-500"
            : "border-[1px] border-violet-400"
        }`}
      >
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Orbs
        </p>
        <div className="flex flex-col justify-center items-start mt-4">
          {orbs?.map((orb, key) => {
            return (
              <div className="w-full flex flex-row justify-between items-center gap-8 dark:text-gray-300">
                <p className="text-xs font-medium">{orb[0]}</p>
                <p className="text-xs">{orb[1]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
