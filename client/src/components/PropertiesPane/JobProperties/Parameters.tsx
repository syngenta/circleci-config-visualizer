import { useEffect, useRef, useState } from "react";
import SelectBox from "../../Widgets/SelectBox/SelectBox";
import InputBox from "../../Widgets/InputBox/InputBox";
import objToArrayConverter from "../../../utils/objToArrayConverter";
import checkEmptyArray from "../../../utils/checkEmptyArray";

const parameterTypes = [
  { value: "string", label: "string" },
  { value: "integer", label: "integer" },
  { value: "boolean", label: "boolean" },
];

type ParametersProps = {
  selectedEntity: any;
  parametersProps: any[];
};

export default function Parameters({
  parametersProps,
  selectedEntity,
}: ParametersProps) {
  const [parameters, setParameters] = useState<any[]>([]);
  const [newParameter, setNewParameter] = useState<{
    name?: string | undefined;
    type?: string | undefined;
  } | null>(null);
  const paramsContainerRef = useRef<any>(null);

  useEffect(() => {
    setNewParameter(null);
  }, [selectedEntity]);

  useEffect(() => {
    setParameters(objToArrayConverter(parametersProps));
  }, [parametersProps]);

  useEffect(() => {
    if (paramsContainerRef.current) {
      paramsContainerRef.current.scrollTop =
        paramsContainerRef.current.scrollHeight;
    }
  }, [newParameter]);
  return (
    <>
      {checkEmptyArray(parameters) && (
        <fieldset className="border-[0px] border-gray-400 rounded my-2 w-full max-h-[200px] flex flex-col gap-2">
          <legend className="font-medium text-gray-700 dark:text-gray-300 px-2 mb-4">
            Parameters
          </legend>
          <div
            ref={paramsContainerRef}
            className="flex flex-col gap-2 overflow-scroll scroll"
          >
            {parameters.length
              ? parameters.map((param: any, key: number) => (
                  <div
                    className="flex flex-row gap-2 items-center justify-start"
                    key={key}
                  >
                    <InputBox
                      type="text"
                      value={param[0]}
                      onChange={(e) => {
                        setParameters(
                          parameters.map((parameter) => {
                            if (parameter === param) {
                              return [e.target.value, param[1]];
                            }
                            return parameter;
                          })
                        );
                      }}
                    />
                    <SelectBox
                      options={parameterTypes}
                      defaultVal={{ value: "string", label: "string" }}
                      onChange={(e: { value: string; label: string }) => {
                        setParameters(
                          parameters.map((parameter) => {
                            if (parameter === param) {
                              return [param[0], { type: e.value }];
                            }
                            return parameter;
                          })
                        );
                      }}
                    />
                  </div>
                ))
              : null}
          </div>
        </fieldset>
      )}
    </>
  );
}
