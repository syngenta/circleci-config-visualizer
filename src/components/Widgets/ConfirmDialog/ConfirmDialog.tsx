import IconOnlyButton from "../Buttons/IconOnlyButton";
import { FaPlus } from "react-icons/fa6";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

type ConfirmDialogProps = {
  msg?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function ConfirmDialog({
  msg = "Are you sure you want to quit?",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <div className="bg-black/60 backdrop-blur-sm fixed top-0 left-0 h-full w-full z-[25] flex flex-row justify-center items-center">
      <div className="dark:bg-gray-800 bg-gray-200 border-gray-400 dark:border-gray-700 border-[1px] w-[30%] h-[30%] rounded shadow-lg relative py-6 px-12">
        <IconOnlyButton
          className="right-4 top-4 absolute"
          icon={
            <FaPlus
              className="rotate-45 text-gray-600"
              size={20}
              onClick={() => {}}
            />
          }
        />
        <div className="mt-8">
          <p className="text-[20px] font-medium text-gray-700 dark:text-gray-300">
            Confirm
          </p>
          <p className="text-[15px] text-gray-600 dark:text-gray-300">{msg}</p>
        </div>
        <div className="flex flex-row justify-end items-center gap-4 w-full mt-8">
          <PrimaryButton
            label="Confirm"
            className="bg-red-500"
            onClick={onConfirm}
          />
          <SecondaryButton label="Cancel" className="" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}
