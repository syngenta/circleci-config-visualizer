import { useEffect, useRef, useState } from "react";
import IconOnlyButton from "../../Widgets/Buttons/IconOnlyButton";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedEntity } from "../../../redux/selectedEntity/selectedEntitySlice";
import { IoMdOpen } from "react-icons/io";
import { setOrbsReducer } from "../../../redux/data/dataSlice";

export default function OrbProperties() {
  const selectedEntity = useSelector(getSelectedEntity);
  const [orbs, setOrbs] = useState(selectedEntity.entity);
  const [newOrb, setNewOrb] = useState<string | null>(null);
  const dispatch = useDispatch();
  const orbsContainerRef = useRef<any>(null);

  const getOrbName = (orbName: string) => {
    return orbName.split("/")[1].split("@")[0];
  };

  const getOrbSourceAndName = (orbName: string) => {
    return orbName.split("@")[0];
  };

  useEffect(() => {
    if (orbsContainerRef.current && newOrb !== null) {
      orbsContainerRef.current.scrollTop =
        orbsContainerRef.current.scrollHeight;
    }
  }, [newOrb]);

  useEffect(() => {
    dispatch(setOrbsReducer(orbs));
  }, [orbs]);

  return (
    <div className="">
      <p className="text-[40px] text-gray-600 dark:text-gray-300 font-medium">
        Orbs
      </p>
      <div
        ref={orbsContainerRef}
        className="w-full h-[400px] flex flex-col justify-between items-center my-8 overflow-scroll scroll"
      >
        <div className="w-full h-fit flex flex-col gap-4 px-4">
          {orbs.map((orb: string[], key: number) => {
            return (
              <div className="w-full flex flex-row items-center justify-between cursor-default">
                <div className="flex flex-col justify-center items-start gap-1">
                  <p className="text-md text-gray-700 dark:text-gray-300 font-medium">
                    {orb[0]}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-400">
                    {orb[1]}
                  </p>
                </div>
                <div className="flex flex-row gap-2 justify-center items-center">
                  <a
                    className="w-fit h-fit flex flex-row justify-center items-center"
                    href={`https://circleci.com/developer/orbs/orb/${getOrbSourceAndName(
                      orb[1]
                    )}`}
                    target="_blank"
                  >
                    <IconOnlyButton
                      icon={<IoMdOpen size={18} color={"dodgerblue"} />}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
