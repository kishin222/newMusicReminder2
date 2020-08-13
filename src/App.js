import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import { spacing } from '@material-ui/system';
// import logo from "./img/cd-image.png"; // with import
import Box from "@material-ui/core/Box";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 400,
  },
  image: {
    width: 64,
    height: 64,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function App() {
  const [releaseInfo, setReleaseInfo] = useState({
    "2020/07/03": [
      {
        title: "人生ふたり坂",
        artist: "内川ひろ美",
        imgSrc: "https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg",
        price: "1,200円",
      },
      {
        title: "リヴィング・イン・ア・ゴースト・タウン",
        artist: "ザ・ローリング・ストーンズ",
        imgSrc: "https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg",
        price: "2,420円",
      },
    ],
    "2020/07/12": [
      {
        title: "人生ふたり坂2",
        artist: "内川ひろ美2",
        imgSrc: "https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg",
        price: "1,200円",
      },
      {
        title: "リヴィング・イン・ア・ゴースト・タウン2",
        artist: "ザ・ローリング・ストーンズ2",
        imgSrc: "https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg",
        price: "2,420円",
      },
    ],
  })
  axios
  .get("https://safe-headland-46948.herokuapp.com/api/v1/releaseInfo/single")
  .then(function (response) {
    // handle success
    setReleaseInfo(response.data)
    // console.log(response)
  })
  const releaseInfoKeys = Object.keys(releaseInfo)
  const classes = useStyles();
  // const dates = Object.keys(releaseInfo)
  // const items = dates.map(date => {
  //   return releaseInfo[date]
  // }
  // )
  // const aiueo = {
  //   "a": [{ k: "ka", s: "sa", t: "ta" }],
  //   "i": [{ k: "ki", s: "si", t: "ti" }],
  //   "u": [{ k: "ku", s: "su", t: "tu" }],
  // }
  // const aiueo2 = Object.keys(aiueo)
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Box bgcolor="#FFF">
          <Toolbar 
          >
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} >
              <Box textAlign="center" color="black">
                リリース情報
              </Box>
            </Typography>
            <Button>Login</Button>
          </Toolbar>
        </Box>
      </AppBar>
      {releaseInfoKeys.map((item) => (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                <Box bgcolor="#f3f3f3" p={2} fontWeight="fontWeightBold" padding={1} >
                  {item} 発売
                </Box>
              </Typography>
            </Grid>
          </Grid>
          {releaseInfo[item].map((item2) => (
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item >
                  <ButtonBase className={classes.image}>
                    <img src={item2.imgSrc} alt="img" height="100%" />
                  </ButtonBase>
                </Grid>
                <Grid item xs={9} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="caption">
                        <Box fontWeight="fontWeightBold" lineHeight={1.2} paddingBottom={0.5}>
                          {item2.title}
                        </Box>
                      </Typography>
                      <Typography variant="caption" gutterBottom >
                        <Box color="#4F4F4F">
                          {item2.artist}
                        </Box>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      ))}
    </div>
  );
}
