import { createContext } from "react";

interface State {
  //   theme: Theme;
  //   changeTheme: () => void;
}

const Context = createContext<State>({
  //   theme: "dark",
  //   changeTheme: () => null,
});

export const ContextProvider: React.FC = ({ children }) => {
  //   const [theme, setTheme] = useState<Theme>("light");

  const context = {
    // theme,
    // changeTheme,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;
