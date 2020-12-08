import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";
import Artist from "./pages/artist";
import Favorite from "./pages/favorite";
import Home from "./pages/home";
import About from "./pages/about";

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/artist" component={Artist} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/about" component={About} />
      </BrowserRouter>
    </>
  );
};

export default App;
