import { ICredit, IMovieResponse, ISearchDetail, ITelevisionResponse } from "../interfaces/IMovie";
import httpClient, { requestHandler } from "../utils/httpClient";

export const MovieService = {
  getMovies(page?: string) {
    const callApi = () => {
      return httpClient.get<IMovieResponse>(`/movie/popular`, {
        params: { language: 'en-US', page: page || 1 },
      });
    };
    return requestHandler(callApi);
  },
  getMovieDetail(id: string) {
    const callApi = () => {
      return httpClient.get<ISearchDetail>(`/movie/${id}`, {
        params: { language: 'en-US' },

      });
    };
    return requestHandler(callApi);
  },
  getMovieCredit(id: string) {
    const callApi = () => {
      return httpClient.get<ICredit>(`movie/${id}/credits`, {
        params: { language: 'en-US' },
      });
    };
    return requestHandler(callApi);
  },
  getTelevision(page?: string) {
    const callApi = () => {
      return httpClient.get<ITelevisionResponse>(`/trending/tv/day`, {
        params: { language: 'en-US', page: page || 1 },
      });
    };
    return requestHandler(callApi);
  }
}