export interface IAiringResponse {
  page: number;
  results: IAiringResult[];
  total_pages: number;
  total_results: number;
}
export interface ISearchMovieResponse {
  page: number;
  results: IMovieTrendingResult[];
  total_pages: number;
  total_results: number;
}

export interface IMovieTrendingResponse {
  page: number;
  results: IMovieTrendingResult[];
  total_pages: number;
  total_results: number;
}

export interface IAiringResult {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: Array<number>[];
  id: number;
  name: string;
  origin_country: Array<string>[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IMovieTrendingResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IFilterResult {
  id: string;
  value: string;
}
