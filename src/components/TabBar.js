import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Home from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MusicNote from "@material-ui/icons/MusicNote";
import { Link } from "react-router-dom";

export default function TabBar() {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="トップ"
        icon={<Home />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="お気に入り"
        icon={<FavoriteIcon />}
        component={Link}
        to="/favorite"
      />
      <BottomNavigationAction
        label="アーティスト"
        icon={<MusicNote />}
        component={Link}
        to="/artist"
      />
    </BottomNavigation>
  );
}
