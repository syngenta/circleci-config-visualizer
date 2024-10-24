import React from "react";

type IconOnlyButtonProps = {
  disabled?: boolean;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  icon: React.ReactNode;
};

export default function IconOnlyButton({
  disabled = false,
  className,
  onClick,
  icon,
}: IconOnlyButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`cursor-pointer hover:opacity-75 ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
