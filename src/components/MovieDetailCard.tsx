import { FC } from "react";
import { ICast, ISearchDetail } from "../interfaces/IMovie";

interface Props {
  data: ISearchDetail;
  casts: ICast[];
}

export const MovieDetailCard: FC<Props> = ({ data, casts }) => {
  return (
    <div
      className="bg-white bg-opacity-5 p-4 pl-10 flex gap-6 rounded-lg bg-cover min-h-[calc(100vh_-_64px)] items-center"
      style={{
        backgroundImage: `linear-gradient(83deg, rgba(2,0,36,1) 11%, rgba(145,0,255,0) 100%), url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
        className="w-[300px] h-auto object-contain"
      />
      <div className="flex flex-col gap-2 text-white">
        <span className="text-5xl font-bold break-keep">
          {data?.original_title}
        </span>
        <hr className="w-[500px]" />

        <div className="line-clamp-6 w-[700px]">
          <p className="text-white">{data.overview}</p>
        </div>

        <div className="flex gap-2 mt-4">
          Genres:
          {data.genres.map((gen) => (
            <div key={gen.id} className="text-red-500">
              {gen.name}
            </div>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-scroll max-w-[1200px] rounded-md">
          {casts.map((cast) => (
            <img
              key={cast.cast_id}
              className="w-[150px] rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
