import axios from "axios";

import { Search, SearchResponse } from "@interface/api";

import data from "@data/api.json";

export default async (search: Search) => {
  const { page, quality, minimum_rating, query_term, genre, sort_by } = search;

  const url = `${data.url}/list_movies.json?page=${page}&quality=${quality}&minimum_rating=${minimum_rating}&query_term=${query_term}&genre=${genre}&sort_by=${sort_by}`;

  const movies: { data: SearchResponse } = await axios.get(url);

  return {
    pagination: {
      currentPage: movies.data.data.page_number,
      limit: movies.data.data.limit,
      count: movies.data.data.movie_count,
    },
    movies: movies.data.data.movies.map((movie) => ({
      title: movie.title,
      image: movie.medium_cover_image,
      id: movie.id,
    })),
  };
};
