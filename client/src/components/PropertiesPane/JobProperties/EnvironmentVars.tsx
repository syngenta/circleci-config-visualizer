import { useEffect, useRef, useState } from "react";
import InputBox from "../../Widgets/InputBox/InputBox";
import objToArrayConverter from "../../../utils/objToArrayConverter";
import checkEmptyArray from "../../../utils/checkEmptyArray";

type EnvironmentVarsProps = {
  selectedEntity: any;
  envVarsProps: any[];
  parameters: any[];
};

export default function EnvironmentVars({
  selectedEntity,
  envVarsProps,
  parameters,
}: EnvironmentVarsProps) {
  const [envVars, setEnvVars] = useState<any[]>([]);
  const [newEnvVar, setNewEnvVar] = useState<{
    name?: string | undefined;
    value?: string | undefined;
  } | null>(null);
  const envVarsContainerRef = useRef<any>(null);

  useEffect(() => {
    setNewEnvVar(null);
  }, [selectedEntity]);

  useEffect(() => {
    setEnvVars(objToArrayConverter(envVarsProps));
  }, [envVarsProps]);

  useEffect(() => {
    if (envVarsContainerRef.current) {
      envVarsContainerRef.current.scrollTop =
        envVarsContainerRef.current.scrollHeight;
    }
  }, [newEnvVar]);

  return (
    <>
      {checkEmptyArray(envVars) && (
        <fieldset className="border-[0px] border-gray-400 rounded my-2 w-full h-[200px] flex flex-col gap-2">
          <legend className="font-medium text-gray-700 dark:text-gray-300 px-2 mb-4">
            Environment variables
          </legend>
          <div
            ref={envVarsContainerRef}
            className="flex flex-col gap-2 overflow-scroll scroll"
          >
            {envVars.map((env: any, key: number) => {
              return (
                <div
                  className="flex flex-row gap-2 items-center justify-start"
                  key={key}
                >
                  <InputBox
                    type="text"
                    value={env[0]}
                    onChange={(e) => {
                      setEnvVars(
                        envVars.map((envVar) => {
                          if (envVar === env) {
                            return [e.target.value, env[1]];
                          }
                          return envVar;
                        })
                      );
                    }}
                  />
                  <InputBox
                    type="text"
                    value={
                      env[1].includes("<<parameters.") ||
                      parameters.includes(
                        env[1]?.split(".")[1]?.replace(">>", "")
                      )
                        ? "@" + env[1].split(".")[1].replace(">>", "")
                        : env[1]
                    }
                    onKeyDown={(e) => {
                      if (
                        e?.key === "Backspace" &&
                        (env[1].includes("<<parameters.") ||
                          env[1].includes("@"))
                      ) {
                        setEnvVars(
                          envVars.map((envVar) => {
                            if (envVar === env) {
                              return [env[0], ""];
                            }
                            return envVar;
                          })
                        );
                      }
                    }}
                    onChange={(e) => {
                      setEnvVars(
                        envVars.map((envVar) => {
                          if (envVar === env) {
                            return [env[0], e.target.value];
                          }
                          return envVar;
                        })
                      );
                    }}
                    style={
                      env[1].includes("<<parameters.") || env[1].includes("@")
                        ? {
                            color: "dodgerblue",
                          }
                        : {
                            color: "white",
                          }
                    }
                  />
                </div>
              );
            })}
          </div>
        </fieldset>
      )}
    </>
  );
}
