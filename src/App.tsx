import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { ContextProvider } from "@components/Context";

import HomePage from "@pages/index";

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;
