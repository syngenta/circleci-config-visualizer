import React, { useRef } from "react";

type MenuItem = {
  onClick?: () => void;
  label: string;
  icon?: React.ReactNode;
};

type MenuProps = {
  x: number;
  y: number;
  menuItems: MenuItem[] | null;
  setMenuItems: (items: MenuItem[] | null) => void;
};

export default function Menu({ x, y, menuItems, setMenuItems }: MenuProps) {
  const menuRef = useRef<HTMLInputElement>(null);

  return (
    <div
      ref={menuRef}
      className="h-fit w-[150px] shadow-lg rounded border-[1px] border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 absolute z-[20]"
      style={{ left: x - 100, top: y }}
    >
      {menuItems?.map((item: MenuItem) => {
        return (
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-200 hover:dark:bg-blue-500 h-[40px] flex flex-row items-center gap-2"
            onClick={item.onClick}
          >
            {item.icon ? item.icon : null}
            <p className="text-xs text-gray-700 dark:text-white">
              {item.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
