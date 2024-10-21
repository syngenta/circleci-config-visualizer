import { useSelector } from "react-redux";
import { getSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import ReactJson from "react-json-view";
import { getDarkMode } from "../../../redux/darkMode/darkModeSlice";

export default function CommandProperties() {
  const selectedEntity = useSelector(getSelectedEntity);
  const darkMode = useSelector(getDarkMode);

  const commandName = selectedEntity.entity[0];
  const commandData = selectedEntity.entity[1];
  const commandDescription = commandData.description;
  const commandStep = commandData.steps[0];

  return (
    <div className="">
      <p className="text-[40px] text-gray-600 dark:text-gray-300 font-medium">
        Commands
      </p>
      <fieldset
        className={`border-[0px] border-gray-400 rounded my-6 w-full h-fit flex flex-col gap-2 relative`}
      >
        <legend className="text-gray-700 dark:text-gray-300 px-0 w-full">
          <p className="text-base font-medium">{commandName}</p>
        </legend>
        <>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {commandDescription}
          </p>
          <div className="my-4">
            <ReactJson
              theme={darkMode ? "ocean" : "rjv-default"}
              src={commandStep}
              name={false}
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
              validationMessage="Error"
              quotesOnKeys
              style={{ fontSize: 12, borderRadius: 5, padding: 10 }}
            />
          </div>
        </>
      </fieldset>
    </div>
  );
}
