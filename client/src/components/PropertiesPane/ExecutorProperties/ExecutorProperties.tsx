import { useSelector } from "react-redux";
import { getSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import InputBox from "../../Widgets/InputBox/InputBox";

export default function ExecutorProperties() {
  const selectedEntity = useSelector(getSelectedEntity);

  return (
    <div className="">
      <p className="text-[40px] text-gray-600 dark:text-gray-300 font-medium">
        Executor
      </p>
      <p className="text-[20px] text-gray-700 dark:text-gray-400 font-medium">
        {selectedEntity.entity[0]}
      </p>
      <div className="flex flex-row items-center gap-4 my-4">
        <p className="text-[15px] text-gray-700 dark:text-gray-300 font-medium">
          Image
        </p>
        <InputBox
          type="text"
          value={
            selectedEntity.entity[1].executor
              ? selectedEntity.entity[1].executor
              : selectedEntity.entity[1].docker[0].image
          }
        />
      </div>
    </div>
  );
}
