import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MovieService } from "../../services/MovieService";
import Pagination from "../../components/Paginate";
import { MovieCard } from "../../components/MovieCard";
import Spinner from "../../components/Spinner";

export const Route = createFileRoute("/_auth/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page ?? 1),
    };
  },
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context: { queryClient }, deps }) => {
    return queryClient.ensureQueryData({
      queryKey: ["movies", deps.page],
      queryFn: () => {
        return MovieService.getMovies(deps.page.toString());
      },
    });
  },
  pendingComponent: () => {
    return <Spinner />;
  },
});

function Index() {
  // const { data } = useQuery({
  //   queryKey: ["movies"],
  //   queryFn: () => {
  //     return MovieService.getMovies();
  //   },
  // });
  const { data } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const onMovePage = (page: number) => {
    navigate({
      search: () => ({ page: page }),
      replace: true,
    });
  };

  return (
    <div className="p-2">
      <div className="flex flex-col gap-4 items-center">
        {data && (
          <>
            <Pagination
              currentPage={search.page}
              onPageChange={onMovePage}
              pageSize={20}
              totalCount={data.total_results}
            />

            {data?.results.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
