import { SiCircleci } from "react-icons/si";
import PrimaryButton from "../../components/Widgets/Buttons/PrimaryButton";
import { FaDocker, FaPlus } from "react-icons/fa6";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setDataReducer } from "../../redux/data/dataSlice";
import yaml from "js-yaml";
import { useNavigate } from "react-router";
import { GoWorkflow } from "react-icons/go";
import { MdDarkMode, MdLightMode, MdWork } from "react-icons/md";
import { HiCommandLine } from "react-icons/hi2";
import { getDarkMode, setDarkMode } from "../../redux/darkMode/darkModeSlice";
import IconOnlyButton from "../../components/Widgets/Buttons/IconOnlyButton";
import SecondaryButton from "../../components/Widgets/Buttons/SecondaryButton";
import { IoConstructOutline } from "react-icons/io5";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(getDarkMode);

  useEffect((): any => {
    const socket = io("http://localhost:3001");

    socket.on("fileData", (data) => {
      const yamlData = yaml.load(data);
      localStorage.setItem(
        "currentFile",
        JSON.stringify(yamlData)
      );
      dispatch(setDataReducer(yamlData));
      navigate("/editor");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex flex-row justify-center items-center h-full dark:bg-gray-800 relative">
      <div className="absolute right-24 top-6 flex flex-row justify-center items-center gap-6">
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
        <SecondaryButton
          label="Development"
          icon={<IoConstructOutline color="text-gray-600" size={18} />}
          onClick={() => {
            navigate("/development");
          }}
        />
      </div>
      <div
        className="flex flex-row justify-center items-center gap-[20%] w-full"
        data-aos="fade-up"
        data-aos-duration={1000}
      >
        <div className="flex flex-col justify-start items-start">
          <p className="text-[40px] font-semibold text-gray-800 dark:text-gray-300">
            CircleCI Config Visualizer
          </p>
          <p className="text-[20px] font-medium text-gray-700 dark:text-gray-300/80">
            Bringing Clarity to Your CI/CD Pipelines
          </p>
          <p className="text-[15px] text-gray-700 w-[500px] mt-4 dark:text-gray-400">
            Gain a comprehensive visual understanding of your CircleCI pipelines
            with an intuitive and interactive config visualizer
          </p>
          <div className="flex flex-row justify-center items-center gap-6 mt-6">
            <PrimaryButton
              icon={<FaPlus />}
              label={`Create New (Coming soon)`}
              className="px-4"
              disabled
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept=".yml,.yaml"
              onChange={(e) => {
                if (e?.target?.files?.length) {
                  var file = e?.target?.files[0];
                  var reader = new FileReader();
                  reader.onload = function (event) {
                    const data: any = event?.target?.result;
                    const yamlData = yaml.load(data);
                    localStorage.setItem(
                      "currentFile",
                      JSON.stringify(yamlData)
                    );
                    dispatch(setDataReducer(yamlData));
                    navigate("/editor");
                  };
                  reader.readAsText(file);
                }
                // setFiles(e.target.files)
              }}
            />
            <label
              htmlFor="fileInput"
              className={`w-fit h-fit flex flex-row items-center justify-center gap-1 text-gray-600 dark:text-gray-300 border-[0px] px-2 rounded text-[13px] cursor-pointer hover:opacity-75`}
            >
              <AiOutlineCloudUpload size={18} />
              Upload
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-[400px] h-[400px] relative">
          <div className="-rotate-[30deg] absolute top-16 left-12 opacity-75">
            <FaDocker className="text-orange-400" size={30} />
          </div>
          <div className="rotate-[20deg] absolute top-12 right-12 opacity-75">
            <HiCommandLine className="text-red-500" size={30} />
          </div>
          <div className="rotate-[10deg] absolute bottom-16 left-20 opacity-75">
            <MdWork className="text-blue-500" size={30} />
          </div>
          <div className="-rotate-[30deg] absolute bottom-16 right-24 opacity-75">
            <GoWorkflow className="text-green-600" size={30} />
          </div>
          <SiCircleci
            className="text-gray-800 dark:text-gray-300/80 drop-shadow-2xl"
            size={200}
          />
        </div>
      </div>

      <div></div>
    </div>
  );
}
