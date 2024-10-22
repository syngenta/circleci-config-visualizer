import { useState } from "react";
import SecondaryButton from "../Widgets/Buttons/SecondaryButton";
import { GoHome } from "react-icons/go";
import Menu from "../Widgets/Menu/Menu";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoCameraOutline, IoConstructOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDarkMode, setDarkMode } from "../../redux/darkMode/darkModeSlice";
import IconOnlyButton from "../Widgets/Buttons/IconOnlyButton";

type ToolBarProps = {
  takingScreenshot: boolean;
  setTakingScreenshot: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToolBar({
  takingScreenshot,
  setTakingScreenshot,
}: ToolBarProps) {
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [menuItems, setMenuItems] = useState<any[] | null>(null);
  const navigate = useNavigate();
  const darkMode = useSelector(getDarkMode);
  const dispatch = useDispatch();

  return (
    <div
      className="h-[7%] w-full flex flex-row items-center justify-start px-6 absolute top-0 z-[20] bg-white/20 dark:bg-gray-800/80 backdrop-blur-md border-b-[1px] border-gray-300 dark:border-gray-600"
      data-aos="fade-up"
      data-aos-duration={1000}
    >
      {menuPosition && menuPosition?.x && menuPosition?.y && (
        <Menu
          setMenuItems={setMenuItems}
          x={menuPosition.x}
          y={menuPosition.y}
          menuItems={menuItems}
        />
      )}
      <div className="self-center mx-6 w-[20%] flex flex-row items-center justify-start gap-4">
        <SecondaryButton
          label="Home"
          icon={<GoHome color="text-gray-600" size={18} />}
          onClick={() => {
            localStorage.removeItem("currentFile");
            navigate("/");
          }}
          className=""
        />
      </div>
      <div className="self-center mx-6 w-[60%] flex flex-row items-center justify-end gap-4">
        <SecondaryButton
          label="Take screenshot"
          icon={<IoCameraOutline size={18} />}
          onClick={() => {
            setTakingScreenshot(true);
          }}
          className=""
        />
        <SecondaryButton
          label="Development"
          icon={<IoConstructOutline size={18} />}
          onClick={() => {
            navigate("/development");
          }}
          className=""
        />
      </div>
      <div className="w-[20%] flex flex-row items-center justify-end px-16">
        <IconOnlyButton
          className="transition-all"
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
    </div>
  );
}
