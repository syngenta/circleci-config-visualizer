import { Handle, NodeResizer, NodeToolbar, Position } from "@xyflow/react";
import objToArrayConverter from "../../../utils/objToArrayConverter";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import { getAllWorkflows } from "../../../redux/data/dataSlice";
import IconOnlyButton from "../../Widgets/Buttons/IconOnlyButton";
import { LuTableProperties } from "react-icons/lu";
import checkIfArray from "../../../utils/checkIfArray";
import checkEmptyObj from "../../../utils/checkEmptyObj";
import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import SecondaryButton from "../../Widgets/Buttons/SecondaryButton";
import { MdVerified } from "react-icons/md";
import {
  getActiveEntity,
  setActiveEntity,
} from "../../../redux/activeEntity/activeEntitySlice";
import checkIfWorkflowUsesJob from "./getAllWorkflowsForAJob";

type WorkflowNodeProps = {
  selected: boolean | undefined;
  data: {
    label: string;
    workflow: any;
    jobs: any;
  };
};

export default function WorkflowNode({
  selected,
  data,
}: WorkflowNodeProps | any) {
  const workflowName: string = data.workflow[0];
  const workflowData: any = data.workflow[1];
  const jobs = data.jobs;
  const dispatch = useDispatch();
  const workflows = useSelector(getAllWorkflows);
  const activeEntity = useSelector(getActiveEntity);
  const [expand, setExpand] = useState<string[]>([]);

  return (
    <>
      <NodeToolbar
        isVisible={
          !(selected === false || selected === undefined) ||
          activeEntity?.entity?.[0] === workflowName
        }
        position={Position.Top}
      >
        <div className="bg-white dark:bg-gray-800 p-1 border-[1px] border-gray-300 dark:border-gray-700 rounded shadow-lg flex flex-row gap-2">
          <IconOnlyButton
            icon={
              <LuTableProperties className="text-gray-500 dark:text-gray-400" />
            }
            onClick={() => {
              dispatch(
                setSelectedEntity({ type: "workflow", entity: data.workflow })
              );
            }}
          />
        </div>
      </NodeToolbar>
      <Handle type="target" position={Position.Bottom} />
      <NodeResizer
        color="#0062ff"
        isVisible={!(selected === false || selected === undefined)}
        minWidth={100 * 2.5}
        minHeight={100 * 4}
      />
      <div
        className={`h-full w-full rounded-tl-[20px] rounded-br-[20px] flex flex-col items-center py-4 px-4 bg-green-300/40 dark:bg-green-800/40 nowheel ${
          (activeEntity?.type === "workflow" &&
            activeEntity.entity[0] === workflowName) ||
          (activeEntity?.type === "job" &&
            checkIfWorkflowUsesJob(
              workflowName,
              workflows,
              activeEntity?.entity[0]
            ))
            ? "opacity-100"
            : "opacity-50"
        } ${
          !(selected === false || selected === undefined)
            ? "border-2 border-blue-500"
            : "border-[1px] border-green-400 dark:border-green-700"
        }`}
        onClick={() => {
          dispatch(
            setActiveEntity({ type: "workflow", entity: data.workflow })
          );
        }}
      >
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Workflow
        </p>
        <p className="text-xs text-gray-800 dark:text-gray-300">
          {workflowName}
        </p>
        <div className="flex flex-col gap-2 h-fit max-h-[300px] scroll mt-4">
          {workflowData?.jobs?.map((job: any, key: number) => {
            var jobArray, jobName, jobData;
            if (typeof job === "object") {
              jobArray = objToArrayConverter(job);
              jobName = jobArray[0][0];
              jobData = jobArray[0][1];
            } else {
              jobArray = [[job]];
              jobName = job;
              jobData = [jobName, []];
            }
            const currentJob = jobs.filter(
              (job: any) => job[0] === jobArray[0][0]
            )[0];
            const currentJobParameters = currentJob
              ? currentJob[1].parameters
              : null;
            const currentJobContexts =
              jobData.context &&
              (checkIfArray(jobData.context)
                ? jobData.context
                : [jobData.context]);
            const currentJobFilters = jobData.filters;
            const branchFilters = currentJobFilters?.branches;
            const tagFilters = currentJobFilters?.tags;
            const branchesAllowed: string[] =
              branchFilters?.only &&
              (checkIfArray(branchFilters?.only)
                ? branchFilters?.only
                : [branchFilters?.only]);
            const branchesIgnored: string[] =
              branchFilters?.ignore &&
              (checkIfArray(branchFilters?.ignore)
                ? branchFilters?.ignore
                : [branchFilters?.ignore]);
            const tagsAllowed: string[] =
              tagFilters?.only &&
              (checkIfArray(tagFilters?.only)
                ? tagFilters?.only
                : [tagFilters?.only]);
            const tagsIgnored: string[] =
              tagFilters?.ignore &&
              (checkIfArray(tagFilters?.ignore)
                ? tagFilters?.ignore
                : [tagFilters?.ignore]);
            return (
              <div
                className="h-fit w-[350px] border-[1px] border-blue-400 rounded-[10px] flex flex-col items-center bg-blue-200 dark:bg-blue-700/40 p-4"
                key={key}
              >
                <div className="flex flex-row gap-2">
                  <p className="text-xs text-gray-800 dark:text-gray-300">
                    {jobData.name
                      ? jobData.name + ` (${jobArray[0][0]})`
                      : jobArray[0][0]}
                  </p>
                  {jobData.type === "approval" && (
                    <MdVerified className="text-purple-500" />
                  )}
                </div>

                {currentJobContexts && (
                  <fieldset className="border-[1px] border-blue-300 dark:border-blue-500 rounded p-2 my-2 w-full flex flex-wrap gap-2">
                    <legend className="text-xs font-semibold text-gray-800 px-2 dark:text-gray-300">
                      Contexts
                    </legend>
                    {currentJobContexts.map((context: any, key: number) => (
                      <p
                        className="text-[8px] font-medium text-gray-800 dark:text-gray-300 bg-green-600/40 dark:bg-green-800/60 p-1 rounded w-fit h-fit"
                        key={key}
                      >
                        {context}
                      </p>
                    ))}
                  </fieldset>
                )}
                {currentJobParameters && (
                  <fieldset
                    className={`border-[1px] border-blue-300 dark:border-blue-500 rounded my-2 p-2 pt-4 w-full flex flex-col relative ${
                      expand.includes(`${jobName}-parameters`)
                        ? "expand-vertically overflow-scroll scroll"
                        : "collapse-vertically overflow-hidden"
                    }`}
                  >
                    <legend className="text-xs font-semibold text-gray-800 px-2 dark:text-gray-300">
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
                        !expand.includes(`${jobName}-parameters`)
                          ? "View"
                          : "Hide"
                      }
                      onClick={() => {
                        !expand.includes(`${jobName}-parameters`)
                          ? setExpand((prev) => [
                              ...prev,
                              `${jobName}-parameters`,
                            ])
                          : setExpand(
                              expand.filter(
                                (item) => item !== `${jobName}-parameters`
                              )
                            );
                      }}
                      className="absolute right-2 top-0 p-0 h-[10px]"
                    />
                    {expand.includes(`${jobName}-parameters`) &&
                      objToArrayConverter(currentJobParameters).map(
                        (params: any, key: number) => (
                          <p
                            className="text-xs text-gray-800 dark:text-gray-300 p-1 rounded w-fit h-fit"
                            key={key}
                          >
                            {params[0] + " : " + (jobData[params[0]] ?? "")}
                          </p>
                        )
                      )}
                  </fieldset>
                )}

                {!checkEmptyObj(currentJobFilters) && (
                  <fieldset
                    className={`border-[1px] border-blue-300 dark:border-blue-500 rounded p-2 pt-4 my-2 w-full flex flex-col relative overflow-scroll scroll ${
                      expand.includes(`${jobName}-filters`)
                        ? "expand-vertically overflow-scroll scroll"
                        : "collapse-vertically overflow-hidden"
                    }`}
                  >
                    <legend className="text-xs font-semibold text-gray-800 px-2 dark:text-gray-300">
                      Filters
                    </legend>
                    <SecondaryButton
                      icon={
                        !expand.includes(`${jobName}-filters`) ? (
                          <FaAngleDown className="text-gray-500" />
                        ) : (
                          <FaAngleUp className="text-gray-500" />
                        )
                      }
                      label={
                        !expand.includes(`${jobName}-filters`) ? "View" : "Hide"
                      }
                      onClick={() => {
                        !expand.includes(`${jobName}-filters`)
                          ? setExpand((prev) => [...prev, `${jobName}-filters`])
                          : setExpand(
                              expand.filter(
                                (item) => item !== `${jobName}-filters`
                              )
                            );
                      }}
                      className="absolute right-2 top-0 p-0 h-[10px]"
                    />

                    {(branchesAllowed || branchesIgnored) &&
                    expand.includes(`${jobName}-filters`) ? (
                      <div className="flex flex-row justify-start items-start gap-2 pt-2">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-300 px-2">
                          Branches :
                        </p>

                        <div>
                          {!checkEmptyObj(branchesAllowed) &&
                            branchesAllowed.map((branch: any, key: number) => (
                              <p
                                className="text-[8px] font-medium text-gray-800 dark:text-gray-300 bg-green-600/40 p-1 rounded w-fit h-fit"
                                key={key}
                              >
                                {branch}
                              </p>
                            ))}
                          {!checkEmptyObj(branchesIgnored) &&
                            branchesIgnored.map((branch: any, key: number) => (
                              <p
                                className="text-[8px] font-medium text-gray-800 dark:text-gray-300 bg-red-600/40 p-1 rounded w-fit h-fit"
                                key={key}
                              >
                                {branch}
                              </p>
                            ))}
                        </div>
                      </div>
                    ) : null}

                    {(tagsAllowed || tagsAllowed) &&
                    expand.includes(`${jobName}-filters`) ? (
                      <div className="flex flex-row justify-start items-start gap-2 pt-2">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-300 px-2">
                          Tags :
                        </p>

                        <div>
                          {!checkEmptyObj(tagsAllowed) &&
                            tagsAllowed.map((tag: any, key: number) => (
                              <p
                                className="text-[8px] font-medium text-gray-800 dark:text-gray-300 bg-green-600/40 p-1 rounded w-fit h-fit"
                                key={key}
                              >
                                {tag}
                              </p>
                            ))}
                          {!checkEmptyObj(tagsIgnored) &&
                            tagsIgnored.map((tag: any, key: number) => (
                              <p
                                className="text-[8px] font-medium text-gray-800 dark:text-gray-300 bg-red-600/40 p-1 rounded w-fit h-fit"
                                key={key}
                              >
                                {tag}
                              </p>
                            ))}
                        </div>
                      </div>
                    ) : null}
                  </fieldset>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
