import { Dispatch, SetStateAction } from "react";
import { IMovieTrendingResult } from "../interfaces/ITvSeries";
import { ColumnFiltersState } from "@tanstack/react-table";

type Props = {
  data: IMovieTrendingResult[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
};

const Select = (props: Props) => {
  const { data, columnFilters, setColumnFilters } = props;
  const onFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  return (
    <div className="max-w-md mb-4">
      <label
        htmlFor="title"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      ></label>
      <select
        id="title"
        onChange={(e) => onFilterChange("title", e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue={""} value={""}>
          Filters
        </option>
        {data &&
          data?.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}

        {/* <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option> */}
      </select>
    </div>
  );
};

export default Select;
