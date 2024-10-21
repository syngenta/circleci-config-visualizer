import Select from "react-select";
import Creatable from "react-select/creatable";

type SelectBoxProps = {
  options: any;
  value?: any;
  defaultVal?: any;
  onChange?: any;
  disabled?: boolean;
  className?: string;
  customInput?: boolean;
};

export default function SelectBox({
  options,
  defaultVal,
  value,
  onChange,
  disabled = true,
  className,
  customInput = false,
}: SelectBoxProps) {
  return (
    <div className={`${className}`}>
      {customInput ? (
        <Creatable
          menuPortalTarget={document.body}
          isDisabled={disabled}
          defaultValue={defaultVal}
          value={value}
          onChange={onChange}
          options={options}
          classNames={{
            input: (state) => `dark:text-white text-[13px] cursor-pointer`,
            singleValue: (state) =>
              `dark:text-white text-[13px] cursor-pointer`,
            control: (state) =>
              `dark:bg-gray-900/70 dark:text-white border-[1px] text-[13px] ${
                state.isFocused
                  ? "border-blue-500"
                  : "border-gray-400 dark:border-gray-700"
              } cursor-pointer`,
            option: (state) =>
              `${
                state.isSelected ? "dark:bg-blue-500" : " dark:bg-gray-900/70"
              } scroll text-[13px] cursor-pointer`,
            menu: (state) => `dark:bg-gray-900/70 text-[13px] scroll h-[100px]`,
            menuList: (state) =>
              `dark:text-white dark:bg-gray-900/70 text-[13px] scroll h-[100px] overflow-y-scroll`,
          }}
        />
      ) : (
        <Select
          menuPortalTarget={document.body}
          isDisabled={disabled}
          defaultValue={defaultVal}
          value={value}
          onChange={onChange}
          options={options}
          classNames={{
            input: (state) => `dark:text-white text-[13px] cursor-pointer`,
            singleValue: (state) =>
              `${!disabled && "dark:text-white"} text-[13px] cursor-pointer`,
            control: (state) =>
              `dark:bg-gray-900/70 dark:text-white border-[1px] text-[13px] ${
                state.isFocused
                  ? "border-blue-500"
                  : "border-gray-400 dark:border-gray-700"
              } cursor-pointer`,
            option: (state) =>
              `${
                state.isSelected ? "dark:bg-blue-500" : " dark:bg-gray-900/70"
              } scroll text-[13px] cursor-pointer`,
            menu: (state) => `dark:bg-gray-900/70 text-[13px] scroll h-[100px]`,
            menuList: (state) =>
              `dark:text-white dark:bg-gray-900/70 text-[13px] scroll h-[100px] overflow-y-scroll`,
          }}
        />
      )}
    </div>
  );
}
