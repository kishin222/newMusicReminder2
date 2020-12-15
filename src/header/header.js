import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import HelpIcon from '@material-ui/icons/Help';
import { grey } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  appTitle: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Box bgcolor="#FFF">
        <Toolbar className={classes.container}>
          <Typography variant="h6" >"  "</Typography>
          <Typography variant="h6" className={classes.appTitle}>
            <Link to="/" style={{ textDecoration: "none", color: grey[800]  }} >
              <img src="/lisna_logo_v3.png" alt="img" width="20"></img> LISNA
            </Link>
          </Typography>
          <Link to="/about">
              < HelpIcon style={{ color: green['A700'] }}/>
          </Link>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Header;
