import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import Films from "./pages/films/Index";
import FilmId from "./pages/films/_id";
import NotFound from "./pages/NotFound";

import "./assets/styles/main.scss";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/films" render={() => <Films />} />
          <Route path="/film/:id" render={withRouter(FilmId)} />
          <Route exact path="/" render={() => <Films />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
