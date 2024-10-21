import React from "react";

type InputBoxProps = {
  type: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  value: string | undefined | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement> | undefined) => void;
  style?: any;
};

export default function InputBox({
  type = "text",
  label,
  className,
  disabled = true,
  placeholder,
  value,
  onChange,
  onKeyDown,
  style,
}: InputBoxProps) {
  return (
    <div className="h-fit">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className={`${!disabled?"bg-white dark:text-white dark:bg-gray-900/70":"bg-gray-200 dark:bg-gray-700/70 text-gray-400"}  border-[1px] border-gray-300 dark:border-gray-700 dark:hover:border-blue-500 hover:border-blue-500 focus:border-2 dark:focus:border-blue-500 focus:border-blue-500 outline-none rounded w-full h-[40px] text-[13px]  px-2 ${className}`}
        style={style}
        value={!value ? "" : value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
