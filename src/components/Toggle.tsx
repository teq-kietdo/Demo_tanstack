import { FC } from "react";

interface Props {
  onToggle: (value: boolean) => void;
}

export const Toggle: FC<Props> = ({ onToggle }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <span className="ms-3 text-sm font-medium text-white dark:text-gray-300 mr-4">
        Normal
      </span>
      <input
        type="checkbox"
        className="sr-only peer"
        onClick={(e) => {
          console.log(e.currentTarget.checked);
          onToggle(e.currentTarget.checked);
        }}
      />
      <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-yellow-100 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-300"></div>
      <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">
        Virtual
      </span>
    </label>
  );
};
