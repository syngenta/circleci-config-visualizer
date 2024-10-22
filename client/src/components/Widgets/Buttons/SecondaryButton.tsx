import React from "react";

type SecondaryButtonProps = {
  label: string;
  disabled?: boolean;
  color?: string;
  onClick?: (e?: any) => void;
  icon?: React.ReactNode;
  className?: string;
};

export default function SecondaryButton({
  label,
  disabled = false,
  color = "white",
  onClick,
  icon,
  className,
}: SecondaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`w-fit h-fit flex flex-row items-center justify-center gap-1 text-gray-600 dark:text-gray-300 border-[0px] px-2 ${color} rounded text-[13px] cursor-pointer hover:opacity-75 ${className}`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
