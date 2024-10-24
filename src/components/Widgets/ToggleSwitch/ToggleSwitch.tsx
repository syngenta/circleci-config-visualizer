type ToggleSwitch = {
  checked: boolean;
  handleToggle: () => void;
  size?: number;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  onColor?: string;
  offColor?: string;
  className?: string;
};
export default function ToggleSwitch({
  checked,
  handleToggle,
  size = 30,
  onIcon,
  offIcon,
  onColor = "bg-blue-500",
  offColor = "bg-white",
  className
}: ToggleSwitch) {
  return (
    <div
      style={{ width: `${size * 2}px`, height: `${size}px` }}
      className={`flex flex-row items-center justify-evenly ${className}`}
    >
      <input
        checked={checked}
        onChange={handleToggle}
        className="react-switch-checkbox h-0 w-0 invisible absolute flex flex-row justify-evenly items-center"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className={`react-switch-label flex flex-row justify-evenly items-center cursor-pointer w-full h-full rounded-full relative shadow-[inset_10px_10px_10px_-7px_rgba(0,0,0,0.75)] ${
          checked ? onColor : offColor
        }`}
        htmlFor={`react-switch-new`}
      >
        {onIcon}
        <span
          style={{ width: `${size}px`, height: `${size}px` }}
          className={`react-switch-button content-none absolute self-center -left-[1px] rounded-full bg-white dark:bg-gray-700 drop-shadow-lg dark:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] my-2`}
        />
        {offIcon}
      </label>
    </div>
  );
}
