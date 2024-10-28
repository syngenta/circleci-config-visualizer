import { useNavigate } from "react-router";
import configReference from "../../data/configReference.json";
import IconOnlyButton from "../../components/Widgets/Buttons/IconOnlyButton";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getDarkMode, setDarkMode } from "../../redux/darkMode/darkModeSlice";
import { IoArrowBack } from "react-icons/io5";
import objToArrayConverter from "../../utils/objToArrayConverter";
import { FaCheck, FaXmark, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export default function Development() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(getDarkMode);

  return (
    <div className="flex flex-row justify-center items-center h-full dark:bg-gray-800 relative">
      <div className="absolute top-6 w-[90%] flex flex-row justify-between items-center gap-6">
        <IconOnlyButton
          icon={
            <IoArrowBack
              size={20}
              className="text-gray-600 dark:text-gray-300 "
            />
          }
          onClick={() => {
            navigate(-1);
          }}
        />
        <IconOnlyButton
          icon={
            darkMode ? (
              <MdLightMode size={20} className={`text-white transition-all`} />
            ) : (
              <MdDarkMode
                size={20}
                className={`text-gray-700 transition-all`}
              />
            )
          }
          onClick={() => {
            localStorage.setItem("darkMode", JSON.stringify(!darkMode));
            dispatch(setDarkMode(!darkMode));
            document.documentElement.classList.contains("dark")
              ? document.documentElement.classList.remove("dark")
              : document.documentElement.classList.add("dark");
          }}
        />
      </div>
      <div className="h-[600px] w-[80%]">
        <div className="w-full flex flex-row justify-evenly items-center p-4">
          <p className="font-medium text-gray-700 dark:text-gray-300 w-[15%]">
            Keys
          </p>
          <p className="font-medium text-gray-700 dark:text-gray-300 w-[7%]">
            Type
          </p>
          <p className="font-medium text-gray-700 dark:text-gray-300 w-[10%] flex flex-row justify-center items-center">
            Required
          </p>
          <p className="font-medium text-gray-700 dark:text-gray-300 w-[25%] flex flex-row justify-center items-center">
            Description
          </p>
          <p className="font-medium text-gray-700 dark:text-gray-300 w-[30%] flex flex-row justify-center items-center">
            Subkeys
          </p>
          <p className="font-medium text-gray-700 dark:text-gray-300 w-[10%]">
            Available for Visualization
          </p>
        </div>
        <div className="flex flex-col justify-start items-start h-[90%] overflow-scroll scroll">
          {objToArrayConverter(configReference).map(
            (item: any, key: number) => {
              const keyName = item[0];
              const { type, required, description, subKeys, availableForVisualization } = item[1];
              return (
                <div
                  className={`flex flex-row justify-evenly items-start gap-2 relative w-full ${
                    key % 2 ? "dark:bg-gray-700" : null
                  } p-4 rounded`}
                >
                  <p className="font-medium text-sm text-gray-700 dark:text-gray-300 w-[15%]">
                    {keyName}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 w-[7%]">
                    {type}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 w-[10%] flex flex-row justify-center items-center">
                    {required ? (
                      <FaCircleCheck className="text-green-500" />
                    ) : (
                      <FaCircleXmark className="text-red-500" />
                    )}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 w-[25%]">
                    {description}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 w-[30%] flex flex-col justify-start items-center gap-2 max-h-[400px] overflow-scroll scroll">
                    {subKeys
                      ? objToArrayConverter(subKeys).map(
                          (subItem: any, key: number) => {
                            const subKeyName = subItem[0];
                            const {
                              type: subItemType,
                              required: subItemRequired,
                              description: subItemDescription,
                            } = item[1];
                            return (
                              <div className="w-full flex flex-col justify-center items-start">
                                <p className="font-medium text-xs text-gray-700 dark:text-gray-300">
                                  {subKeyName}
                                </p>
                                <p className="pl-2 text-[10px] text-gray-700 dark:text-gray-300 flex flex-row justify-center items-center gap-2">
                                  {"Type: " + subItemType}
                                </p>
                                <p className="pl-2 text-[10px] text-gray-700 dark:text-gray-300 flex flex-row justify-center items-center gap-2">
                                  {"Required: "}
                                  {subItemRequired ? (
                                    <FaCircleCheck className="text-green-500" />
                                  ) : (
                                    <FaCircleXmark className="text-red-500" />
                                  )}
                                </p>
                                <p className="pl-2 text-[10px] text-gray-700 dark:text-gray-300 flex flex-row justify-center items-center gap-2">
                                  {"Description: " + subItemDescription}
                                </p>
                              </div>
                            );
                          }
                        )
                      : "-"}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 w-[10%] flex flex-row justify-center items-center">
                    {availableForVisualization ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaXmark className="text-red-500" />
                    )}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
