import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IMovieTrendingResult } from "../interfaces/ITvSeries";

type Props = {
  data: IMovieTrendingResult[];
};

const columnHelper = createColumnHelper<IMovieTrendingResult>();
const columns = [
  columnHelper.accessor("adult", {
    header: "Adult",
    size: 60,
    cell: (info) => info.getValue(),
    enableResizing: false,
  }),
  columnHelper.accessor("backdrop_path", {
    header: "Backdrop path",
    size: 100,
    cell: (info) => (
      <span style={{ width: info.column.getSize() }}>{info.getValue()}</span>
    ),
    enableResizing: false,
  }),
  columnHelper.accessor("title", {
    header: "Title",
    size: 150,
    cell: (info) => (
      <span
        style={{ width: info.column.getSize() }}
        className="text-ellipsis block whitespace-nowrap overflow-hidden"
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("overview", {
    header: "Overview",
    size: 300,
    minSize: 300,
    maxSize: 800,
    cell: (info) => (
      <span
        style={{ width: info.column.getSize() }}
        className="text-ellipsis block whitespace-nowrap overflow-hidden"
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("poster_path", {
    header: "Poster path",
    size: 60,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("media_type", {
    header: "Media type",
    size: 100,
    cell: (info) => info.getValue(),
    enableResizing: false,
  }),
];

const BasicTable = (props: Props) => {
  const { data } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });
  return (
    <table
      className={`border-2 border-inherit border-solid w-full`}
      style={{
        width: table.getTotalSize(),
      }}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  position: "relative",
                  width: header.getSize(),
                  minWidth: header.getSize(),
                }}
                className={`border-2`}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  ></div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="border-2 border-inherit border-solid">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`border-2`}
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicTable;
