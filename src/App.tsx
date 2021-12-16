import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { ContextProvider } from "@components/Context";

// import HomePage from "@pages/index";
// import Movie from "@pages/movie";
import Editor from "@pages/editor";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Editor} />

          {/* <Route exact path="/movie/:id" component={Movie} /> */}

          {/* <Route exact path="/editor" component={Editor} /> */}
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;
