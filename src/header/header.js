import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from 'react-router-dom'
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FavoriteIcon from '@material-ui/icons/Favorite';
import useStyles from "../styles/useStyles";

 const Header = () => {
  const classes = useStyles();
 return(
    <div className={classes.root}>
      <AppBar position="static" >
        <Box bgcolor="#FFF">
          <Toolbar>
            <Link to="/favorite">
              <FavoriteIcon />
            </Link>
            <Typography variant="h6" className={classes.title} >
              <Link to="/">
                <Box textAlign="center" color="black">
                  LISTENA
                </Box>
              </Link>
            </Typography>
            <Link to="/artist">
              <AccountBoxIcon />
            </Link>
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  )
 }
export default Header;