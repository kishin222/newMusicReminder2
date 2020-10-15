import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Artist from "./pages/artist";
import Favorite from "./pages/favorite";
import Home from "./pages/home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/artist" component={Artist} />
          <Route path="/favorite" component={Favorite} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;