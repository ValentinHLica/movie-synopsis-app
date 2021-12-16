export type Quality = "all" | "720p" | "1080p" | "2160p" | "3D";

export type Genre =
  | "all"
  | "Action"
  | "Adventure"
  | "Animation"
  | "Biography"
  | "Comedy"
  | "Crime"
  | "Documentary"
  | "Drama"
  | "Family"
  | "Fantasy"
  | "Film-Noir"
  | "Game-Show"
  | "History"
  | "Horror"
  | "Music"
  | "Musical"
  | "Mystery"
  | "News"
  | "Reality-TV"
  | "Romance"
  | "Sci-Fi"
  | "Sport"
  | "Talk-Show"
  | "Thriller"
  | "War"
  | "Western";

export type Sort =
  | "title"
  | "year"
  | "rating"
  | "peers"
  | "seeds"
  | "download_count"
  | "like_count"
  | "date_added";

export type Rating = 0 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;

export type Order = "desc" | "asc";

export type Filters = {
  quality: Quality;
  genre: Genre;
  rating: Rating;
  sort: Sort;
};

export type Search = {
  limit: number;
  page: number;
  quality: Quality;
  minimum_rating: number;
  query_term: string;
  genre: Genre;
  sort_by: Sort;
  order_by: Order;
};

export type SearchMovie = {
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  state: string;
  torrents: {
    url: string;
    hash: string;
    quality: string;
    type: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
  }[];
  date_uploaded: string;
  date_uploaded_unix: number;
};

export type SingleMovie = {
  title: string;
  image: string;
  id: number;
};

export type SearchResponse = {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: SearchMovie[];
  };
};
