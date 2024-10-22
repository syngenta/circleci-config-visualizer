import { useSelector } from "react-redux";
import { getSelectedEntity } from "../../redux/selectedEntity/selectedEntitySlice";
import JobProperties from "./JobProperties/JobProperties";
import OrbProperties from "./OrbProperties/OrbProperties";
import ExecutorProperties from "./ExecutorProperties/ExecutorProperties";
import WorkflowProperties from "./WorkflowProperties/WorkflowProperties";
import CommandProperties from "./CommandProperties/CommandProperties";

export default function PropertiesPane() {
  const selectedEntity = useSelector(getSelectedEntity);

  return (
    <div
      className={`w-[45%] h-full bg-gray-100 dark:bg-gray-800 px-6 pt-14 overflow-y-scroll scroll border-l-[1px] border-gray-300 dark:border-gray-600 ${
        selectedEntity.type
          ? "expand-properties-pane"
          : "collapse-properties-pane"
      } `}
    >
      {selectedEntity.type && selectedEntity.type === "job" && (
        <JobProperties />
      )}
      {selectedEntity.type && selectedEntity.type === "workflow" && (
        <WorkflowProperties />
      )}
      {selectedEntity.type && selectedEntity.type === "orb" && (
        <OrbProperties />
      )}
      {selectedEntity.type && selectedEntity.type === "executor" && (
        <ExecutorProperties />
      )}
      {selectedEntity.type && selectedEntity.type === "command" && (
        <CommandProperties />
      )}
    </div>
  );
}
