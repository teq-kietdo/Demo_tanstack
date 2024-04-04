import { createFileRoute } from "@tanstack/react-router";
import { FC } from "react";
import { MovieService } from "../../services/MovieService";
import { MovieDetailCard } from "../../components/MovieDetailCard";

const MovieDetail: FC = () => {
  const { dataMovie, dataCredit } = Route.useLoaderData();

  return (
    <div>
      {dataMovie && dataCredit && (
        <MovieDetailCard data={dataMovie} casts={dataCredit.cast} />
      )}
    </div>
  );
};

export const Route = createFileRoute("/_auth/$movie")({
  component: MovieDetail,
  loader: async ({ params }) => {
    const { data: dataMovie } = await MovieService.getMovieDetail(params.movie);
    const { data: dataCredit } = await MovieService.getMovieCredit(
      params.movie
    );
    return {
      dataMovie,
      dataCredit,
    };
  },
});
