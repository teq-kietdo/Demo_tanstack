import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TVSeriesService } from "../../services/TVSeriesService";
import BasicTable from "../../components/BasicTable";
import FilterTable from "../../components/FilterTable";

import SortingTable from "../../components/SortingTable";

export const Route = createFileRoute("/_auth/table")({
  component: () => <Table />,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: ["trendingMovie"],
      queryFn: () => {
        return TVSeriesService.getAllMovieTrending();
      },
    });
  },
});
const Table = () => {
  const { data: movie } = Route.useLoaderData();
  const [data] = useState(movie?.results || []);

  return (
    <div className="p-4 bg-white overflow-x-scroll overflow-y-hidden min-h-screen">
      {/* <BasicTable data={data} /> */}
      <br />
      <br />
      <br />
      <FilterTable data={data} />
      {/* <SortingTable data={data} /> */}
      <br />
    </div>
  );
};
