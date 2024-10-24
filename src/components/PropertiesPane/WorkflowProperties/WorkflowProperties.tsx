import { useSelector } from "react-redux";
import { getSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import objToArrayConverter from "../../../utils/objToArrayConverter";
import Jobs from "./Jobs";

export default function WorkflowProperties() {
  const selectedEntity = useSelector(getSelectedEntity);

  return (
    <div className="">
      <p className="text-[40px] text-gray-600 dark:text-gray-300 font-medium">
        Workflow
      </p>
      <p className="text-[20px] text-gray-700 dark:text-gray-400 font-medium">
        {selectedEntity.entity[0]}
      </p>
      <p className="text-[20px] text-gray-700 dark:text-gray-300 font-medium mt-6">
        Jobs
      </p>
      <div className="overflow-scroll scroll mt-4">
        {selectedEntity.entity[1].jobs.map((job: any, key: number) => {
            const jobName = objToArrayConverter(job)[0][0];
            const jobData = objToArrayConverter(job)[0][1];
            return(
                <Jobs jobName={jobName} jobData={jobData} key={key} />
            )
        })}
      </div>
    </div>
  );
}
