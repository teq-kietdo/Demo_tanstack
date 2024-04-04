import { FC } from "react";
import { ISearchResult } from "../interfaces/IMovie";
import { Link } from "@tanstack/react-router";

interface Props {
  movie: ISearchResult;
}

export const MovieCard: FC<Props> = ({ movie }) => {
  const movieImagePath = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

  return (
    <div className="rounded-lg flex gap-3 bg-[#ffffff1a] p-2 w-[500px]">
      <img src={movieImagePath} className="w-[200px] object-contain rounded" />
      <div className="flex flex-col gap-1">
        <Link
          className="text-white text-base line-clamp-1 hover:text-purple-500"
          to="/$movie"
          search={false}
          params={{ movie: movie.id.toString() }}
        >
          {movie.original_title}
        </Link>
        <div className="flex gap-1 text-white text-xs font-extralight">
          <span>voting:</span>
          <span className="text-yellow-300">{movie.vote_average}</span>
        </div>

        <div className="text-white text-xs font-extralight mt-1">
          <span>overview:</span>
          <span className="text-yellow-300 text-ellipsis line-clamp-2 mt-1">
            {movie.overview}
          </span>
        </div>
      </div>
    </div>
  );
};
