import { Rings } from "react-loader-spinner";

type LoadingProps = {
  text?: string;
};

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className="text-gray-800 dark:text-gray-400 text-sm">{text}</p>
    </div>
  );
}
