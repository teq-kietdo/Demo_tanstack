export interface IMovieResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: ISearchResult[];
}

export interface ISearchResult {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number
    vote_count: number
}

export interface ISearchDetail {
    adult: boolean;
    backdrop_path: string;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[],
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: IProductCompany[]
}

export interface IProductCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ICredit {
    id: number;
    cast: ICast[]
}

export interface ICast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface ITelevisionResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: ITelevisionResult[];
}

export interface ITelevisionResult {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: string;
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
}