type DividerProps = {
  className?: string;
};
export default function Divider({ className }: DividerProps) {
  return (
    <div
      className={`border-t-[1px] border-gray-400 dark:border-gray-700 w-full my-8 ${className}`}
    ></div>
  );
}
