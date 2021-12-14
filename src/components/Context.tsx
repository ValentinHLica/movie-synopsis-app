import { createContext, useState } from "react";

interface State {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Context = createContext<State>({
  searchQuery: "",
  setSearchQuery: () => null,
});

export const ContextProvider: React.FC = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const context = {
    searchQuery,
    setSearchQuery,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;
