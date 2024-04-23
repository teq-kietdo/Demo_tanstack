import {
  IAiringResponse,
  IMovieTrendingResponse,
  ISearchMovieResponse,
} from "../interfaces/ITvSeries";
import httpClient, { requestHandler } from "../utils/httpClient";

export const TVSeriesService = {
  getAiringToday(page: string) {
    const callApi = () => {
      return httpClient.get<IAiringResponse>(`/tv/airing_today`, {
        params: { language: "en-US", page: page || 1 },
      });
    };
    return requestHandler(callApi);
  },
  getAllMovieTrending() {
    const callApi = () => {
      return httpClient.get<IMovieTrendingResponse>(
        `/trending/movie/day?language=en-US`
      );
    };
    return requestHandler(callApi);
  },
  getSearchMovie(query: string) {
    const callApi = () => {
      return httpClient.get<ISearchMovieResponse>(
        `/search/movie?query=${query}&include_adult=false&language=en-US`
      );
    };
    return requestHandler(callApi);
  },
};
