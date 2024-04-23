import { useMemo, useState } from "react";
import { IMovieTrendingResult } from "../interfaces/ITvSeries";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SearchInput from "./SearchInput";
import Select from "./Select";

type Props = {
  data: IMovieTrendingResult[];
};

const FilterTable = (props: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data } = props;

  const columns = useMemo<ColumnDef<IMovieTrendingResult, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        size: 60,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "media_type",
        header: "Media Type",
        size: 100,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "original_language",
        header: "Original language",
        size: 100,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "original_title",
        header: "Original title",
        size: 100,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "overview",
        header: "Overview",
        // size: 100,
        cell: (info) => (
          <span className="max-w-[200px] text-ellipsis block whitespace-nowrap overflow-hidden">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 300,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "poster_path",
        header: "Poster path",
        size: 100,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "release_date",
        header: "Release date",
        size: 100,
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="relative">
      {/* <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center pb-4"> */}
      <SearchInput
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      <Select
        data={data}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      {/* </div> */}
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        style={{
          position: "relative",
          margin: "0 auto",
        }}
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-ellipsis"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 max-w-[900px] w-full"
            >
              {row.getVisibleCells().map((cell) => (
                <th
                  key={cell.id}
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-ellipsis"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </th>
                //   <td className="px-6 py-4">Silver</td>
                //   <td className="px-6 py-4">Laptop</td>
                //   <td className="px-6 py-4">$2999</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterTable;
