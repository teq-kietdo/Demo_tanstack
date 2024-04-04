import { FC } from "react";

const Spinner: FC = () => {
  return (
    <div
      data-component="Spinner"
      className="flex justify-center items-center w-full h-full z-[999] fixed top-0 left-0"
    >
      <div className="spinner"></div>
    </div>
  );
};
export default Spinner;
