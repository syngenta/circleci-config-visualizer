import { Handle, Position, NodeResizer, NodeToolbar } from "@xyflow/react";
import objToArrayConverter from "../../../utils/objToArrayConverter";
import { useDispatch, useSelector } from "react-redux";
import IconOnlyButton from "../../Widgets/Buttons/IconOnlyButton";
import { getAllJobs, getAllWorkflows } from "../../../redux/data/dataSlice";
import { setSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import { LuTableProperties } from "react-icons/lu";
import {
  getActiveEntity,
  setActiveEntity,
} from "../../../redux/activeEntity/activeEntitySlice";
import { useState } from "react";
import checkIfJobExistsInWorkflow from "./checkIfJobExistsInWorkflow";
import SecondaryButton from "../../Widgets/Buttons/SecondaryButton";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import checkIfCommandExistsInJob from "./checkIfCommandExistsInJob";

type JobNodeProps = {
  selected: boolean | undefined;
  data: {
    label: string;
    job: any;
  };
};

export default function JobNode({ selected, data }: JobNodeProps | any) {
  const [activeJobs, setActiveJobs] = useState<string[] | never>([]);
  const dispatch = useDispatch();
  const activeEntity = useSelector(getActiveEntity);
  const workflows = useSelector(getAllWorkflows);
  const jobs = useSelector(getAllJobs);
  const jobName: string = data?.job?.[0];
  const jobData: any = data?.job?.[1];
  const executor = jobData?.executor
    ? jobData?.executor
    : jobData?.machine
    ? jobData?.machine?.image
    : jobData?.docker[0]["image"];
  const parameters = jobData?.parameters
    ? objToArrayConverter(jobData?.parameters)
    : null;
  const envVariables = jobData?.environment
    ? objToArrayConverter(jobData?.environment)
    : null;
  const [expand, setExpand] = useState<string[]>([]);

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
              dispatch(setSelectedEntity({ type: "job", entity: data?.job }));
            }}
          />
        </div>
      </NodeToolbar>
      <Handle type="target" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} id="command" />
      <Handle type="source" position={Position.Top} />
      <NodeResizer
        color="#0062ff"
        isVisible={!(selected === false || selected === undefined)}
        minWidth={100 * 2.5}
        minHeight={100 * 4}
      />
      <div
        className={`h-full min-w-[250px] w-full rounded-tl-[20px] rounded-br-[20px] flex flex-col items-center py-4 px-4 bg-blue-400/40 dark:bg-blue-700/40 nowheel ${
          (activeEntity?.type === "workflow" &&
            checkIfJobExistsInWorkflow(jobName, activeEntity?.entity[1])) ||
          (activeEntity.type === "command" &&
            checkIfCommandExistsInJob(activeEntity?.entity[0], jobData)) ||
          (activeEntity.type === "job" &&
            activeEntity?.entity[0] === jobName) ||
          (activeEntity.type === "executor" &&
            activeEntity?.entity[0] === jobData.executor)
            ? "opacity-100"
            : "opacity-50"
        } ${
          !(selected === false || selected === undefined)
            ? "border-2 border-blue-500"
            : "border-[1px] border-blue-400"
        }`}
        onClick={() => {
          dispatch(setActiveEntity({ type: "job", entity: data?.job }));
        }}
      >
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Job
        </p>
        <p className="text-xs text-gray-800 dark:text-gray-300">{jobName}</p>

        <div className="flex flex-row gap-4 justify-between items-center my-2">
          <p className="text-xs text-gray-800 dark:text-gray-300 font-medium">
            {jobData?.docker ? "Docker:" : "Executor:"}
          </p>
          <p className="text-xs text-gray-800 dark:text-gray-300 bg-orange-400/40 p-1 rounded w-fit h-fit">
            {executor}
          </p>
        </div>
        {parameters && (
          <fieldset
            className={`border-[1px] border-blue-300 dark:border-blue-600/40 rounded p-2 pt-6 my-2 w-full flex flex-col relative ${
              expand.includes(`${jobName}-parameters`)
                ? "expand-vertically overflow-scroll scroll"
                : "collapse-vertically overflow-hidden"
            }`}
          >
            <legend className="text-xs font-semibold text-gray-800 dark:text-gray-300 px-2">
              Parameters
            </legend>
            <SecondaryButton
              icon={
                !expand.includes(`${jobName}-parameters`) ? (
                  <FaAngleDown className="text-gray-500" />
                ) : (
                  <FaAngleUp className="text-gray-500" />
                )
              }
              label={
                !expand.includes(`${jobName}-parameters`) ? "View" : "Hide"
              }
              onClick={() => {
                !expand.includes(`${jobName}-parameters`)
                  ? setExpand((prev) => [...prev, `${jobName}-parameters`])
                  : setExpand(
                      expand.filter((item) => item !== `${jobName}-parameters`)
                    );
              }}
              className="absolute right-0 top-0 p-0 h-[10px]"
            />
            {expand.includes(`${jobName}-parameters`) &&
              parameters.map((param: any, key: number) => (
                <div
                  className="flex flex-row gap-4 justify-between items-center mb-1"
                  key={key}
                >
                  <p className="text-xs text-gray-800 dark:text-gray-300">
                    {param[0]}
                  </p>
                  <p className="text-xs text-blue-500">{param[1]["type"]}</p>
                </div>
              ))}
          </fieldset>
        )}
        {envVariables && (
          <fieldset
            className={`border-[1px] border-blue-300 dark:border-blue-600/40 rounded p-2 pt-6 my-2 w-full flex flex-col relative ${
              expand.includes(`${jobName}-envVars`)
                ? "expand-vertically overflow-scroll scroll"
                : "collapse-vertically overflow-hidden"
            }`}
          >
            <legend className="text-xs font-semibold text-gray-800 dark:text-gray-300 px-2">
              Environment vars
            </legend>
            <SecondaryButton
              icon={
                !expand.includes(`${jobName}-envVars`) ? (
                  <FaAngleDown className="text-gray-500" />
                ) : (
                  <FaAngleUp className="text-gray-500" />
                )
              }
              label={!expand.includes(`${jobName}-envVars`) ? "View" : "Hide"}
              onClick={() => {
                !expand.includes(`${jobName}-envVars`)
                  ? setExpand((prev) => [...prev, `${jobName}-envVars`])
                  : setExpand(
                      expand.filter((item) => item !== `${jobName}-envVars`)
                    );
              }}
              className="absolute right-0 top-0 p-0 h-[10px]"
            />
            {expand.includes(`${jobName}-envVars`) &&
              envVariables.map((env: any, key: number) => (
                <div
                  className="flex flex-row gap-4 justify-between items-center my-1"
                  key={key}
                >
                  <p className="text-xs text-gray-800 dark:text-gray-300">
                    {env[0]}
                  </p>
                  {env[1].includes("<<parameters.") ? (
                    <p className="text-xs text-blue-600 bg-blue-400/40 dark:text-blue-300 px-1 rounded">
                      {"@" + env[1].split(".")[1].replace(">>", "")}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-800">{env[1]}</p>
                  )}
                </div>
              ))}
          </fieldset>
        )}
      </div>
    </>
  );
}
