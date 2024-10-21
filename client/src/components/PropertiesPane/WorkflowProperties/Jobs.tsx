import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import SecondaryButton from "../../Widgets/Buttons/SecondaryButton";
import { MdVerified } from "react-icons/md";
import InputBox from "../../Widgets/InputBox/InputBox";
import { useSelector } from "react-redux";
import { getAllJobs } from "../../../redux/data/dataSlice";
import objToArrayConverter from "../../../utils/objToArrayConverter";
import checkIfArray from "../../../utils/checkIfArray";
import checkEmptyObj from "../../../utils/checkEmptyObj";
import Divider from "../../Widgets/Divider/Divider";
import checkEmptyArray from "../../../utils/checkEmptyArray";

type JobsProps = {
  jobName: string;
  jobData: any;
};

export default function Jobs({ jobName, jobData }: JobsProps) {
  const jobs = useSelector(getAllJobs);
  const [expand, setExpand] = useState(false);
  const contexts =
    jobData.context &&
    (checkIfArray(jobData.context) ? jobData.context : [jobData.context]);
  const jobDepends = checkIfArray(jobData.requires)
    ? jobData.requires.map((job) => `${job}, `)
    : jobData.requires;
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
    (checkIfArray(tagFilters?.only) ? tagFilters?.only : [tagFilters?.only]);
  const tagsIgnored: string[] =
    tagFilters?.ignore &&
    (checkIfArray(tagFilters?.ignore)
      ? tagFilters?.ignore
      : [tagFilters?.ignore]);

  const currentJob = jobs.filter((job: any) => job[0] === jobName)[0];
  const currentJobParameters = currentJob
    ? objToArrayConverter(currentJob[1].parameters)
    : null;

  return (
    <>
      <fieldset
        className={`border-[0px] border-gray-400 rounded my-0 w-full flex flex-col gap-2 overflow-scroll scroll relative ${
          expand ? "expand-workflow-job" : "collapse-workflow-job"
        } `}
      >
        {jobData.type === "approval" && (
          <div className="flex flex-row gap-2 justify-start items-center mt-2 ml-4">
            <p className="text-gray-700 dark:text-gray-300 text-[13px]">
              Approval
            </p>
            <MdVerified className="text-purple-500" />
          </div>
        )}
        <legend className="text-gray-700 dark:text-gray-300 px-2 w-full">
          <div className="flex flex-row justify-between items-center">
            <p className="text-base font-semibold">
              {jobName + (jobData.name ? ` (${jobData.name})` : ``)}
            </p>
            {jobData.type !== "approval" && (
              <SecondaryButton
                icon={
                  !expand ? (
                    <FaAngleDown className="text-gray-500" />
                  ) : (
                    <FaAngleUp className="text-gray-500" />
                  )
                }
                label={!expand ? "View" : "Hide"}
                onClick={() => {
                  setExpand(!expand);
                }}
                className="p-0 h-[10px]"
              />
            )}
          </div>
        </legend>
        {expand && (
          <>
            {jobData.requires && (
              <fieldset className="border-[0px] border-blue-300 dark:border-blue-500 rounded p-4 w-full flex flex-row items-center gap-2 mt-2">
                <p className="text-sm font-semibold text-gray-800 px-0 dark:text-gray-300">
                  Depends on:
                </p>
                <p className="text-xs p-1 font-regular rounded text-gray-800 dark:text-gray-300 bg-blue-300 dark:bg-blue-500">
                  {jobDepends}
                </p>
              </fieldset>
            )}
            {contexts && (
              <fieldset className="border-[0px] border-blue-300 dark:border-blue-500 rounded p-4 w-full flex flex-wrap gap-2 mt-2">
                <legend className="text-sm font-semibold text-gray-800 px-0 dark:text-gray-300">
                  Contexts
                </legend>
                {contexts.map((context: any, key: number) => (
                  <div className="relative">
                    <p
                      className="text-[12px] text-gray-800 dark:text-gray-300 bg-green-600/40 dark:bg-green-800/60 p-1 rounded w-fit h-fit"
                      key={key}
                    >
                      {context}
                    </p>
                  </div>
                ))}
              </fieldset>
            )}

            {checkEmptyArray(currentJobParameters as any[]) && (
              <fieldset className="border-[0px] border-blue-300 dark:border-blue-500 rounded p-4 w-full flex flex-wrap gap-2 mt-2">
                <legend className="text-sm font-semibold text-gray-800 px-0 dark:text-gray-300">
                  Parameters
                </legend>
                {currentJobParameters?.map((parameter: any, key: number) => {
                  return (
                    <div
                      className="flex flex-row gap-2 items-center justify-start"
                      key={key}
                    >
                      <InputBox type="text" value={parameter[0]} />
                      <InputBox type="text" value={jobData[parameter[0]]} />
                    </div>
                  );
                })}
              </fieldset>
            )}

            {!checkEmptyObj(currentJobFilters) && (
              <fieldset className="border-[0px] border-blue-300 dark:border-blue-500 rounded p-4 w-full flex flex-wrap mt-2 mb-4">
                <legend className="text-sm font-semibold text-gray-800 px-0 dark:text-gray-300">
                  Filters
                </legend>
                {branchesAllowed || branchesIgnored ? (
                  <div className="flex flex-row justify-start items-start gap-2 w-full">
                    <p className="w-[20%] text-xs font-semibold text-gray-800 dark:text-gray-300 px-2">
                      Branches :
                    </p>

                    <div className="w-[80%]">
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

                {tagsAllowed || tagsAllowed ? (
                  <div className="flex flex-row justify-start items-start gap-2 pt-2 w-full">
                    <p className="w-[20%] text-xs font-semibold text-gray-800 dark:text-gray-300 px-2">
                      Tags :
                    </p>

                    <div className="w-[80%]">
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
          </>
        )}
      </fieldset>
      <Divider className="my-0 mt-0 mb-4" />
    </>
  );
}
