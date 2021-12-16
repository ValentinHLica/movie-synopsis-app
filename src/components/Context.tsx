import { createContext, useState } from "react";

import { Filters, SingleMovie } from "@interface/api";

interface State {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  movies: SingleMovie[] | null;
  setMovies: React.Dispatch<React.SetStateAction<SingleMovie[] | null>>;
}

const Context = createContext<State>({
  searchQuery: "",
  setSearchQuery: (query) => null,
  filters: {
    quality: "all",
    genre: "all",
    rating: 0,
    sort: "date_added",
  },
  setFilters: (filters) => null,
  movies: null,
  setMovies: (movies) => null,
});

export const ContextProvider: React.FC = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    quality: "all",
    genre: "all",
    rating: 0,
    sort: "date_added",
  });
  const [movies, setMovies] = useState<SingleMovie[] | null>(null);

  const context = {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    movies,
    setMovies,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;
