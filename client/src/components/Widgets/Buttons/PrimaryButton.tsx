import React from "react";

type PrimaryButtonProps = {
  label: string;
  disabled?: boolean;
  color?: string;
  onClick?: (e?: any) => void;
  icon?: React.ReactNode;
  className?: string;
};

export default function PrimaryButton({
  label,
  disabled = false,
  color = "bg-blue-500",
  onClick,
  icon,
  className
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`w-fit flex flex-row items-center justify-center gap-1 text-white border-[0px] p-2 ${disabled?"bg-gray-500 dark:bg-gray-500 cursor-not-allowed":`${color} hover:opacity-75 cursor-pointer`} rounded text-[13px] ${className}`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
