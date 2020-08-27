import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { BrowserRouter, Route, Link } from 'react-router-dom'
// import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const Home = () => {
  const [releaseInfo, setReleaseInfo] = useState({
  })
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('https://safe-headland-46948.herokuapp.com/api/v1/releaseInfo/single');
      // handle success
      setReleaseInfo(response.data)
    }
    getUser()
  }, [])
  const releaseInfoKeys = Object.keys(releaseInfo)
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Box bgcolor="#FFF">
          <Toolbar>
            <Typography variant="h6" className={classes.title} >
              <Box textAlign="center" color="black">
                Release Info
              </Box>
            </Typography>
            <Link to="/artist">
              <AccountBoxIcon />
            </Link>
          </Toolbar>
        </Box>
      </AppBar>
      {releaseInfoKeys.map((item, index) => (
        <div key={index}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                <Box bgcolor="#f3f3f3" p={2} fontWeight="fontWeightBold" padding={1} >
                  {item} 発売
                </Box>
              </Typography>
            </Grid>
          </Grid>
          {releaseInfo[item].map((item2, index) => (
            <Paper className={classes.paper} key={index}>
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

const Artist = () => {
  const classes = useStyles();
  const [artistList, setArtistList] = useState(
    [
      {
        name: '瑛人',
        imgSrc: 'https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg'
      },
      {
        name: '米津玄師',
        imgSrc: 'https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg'
      },
      {
        name: '東京事変',
        imgSrc: 'https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg'
      },
      {
        name: '中島みゆき',
        imgSrc: 'https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg'
      },
      {
        name: 'ナナヲアカリ',
        imgSrc: 'https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg'
      },
      {
        name: 'DISH//',
        imgSrc: 'https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg'
      },
      {
        name: 'GLAY',
        imgSrc: 'https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg'
      },
      {
        name: 'YOASOBI',
        imgSrc: 'https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg'
      },
      {
        name: 'BUMP OF CHICKEN',
        imgSrc: 'https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg'
      },
      {
        name: 'ヨルシカ',
        imgSrc: 'https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg'
      },
      {
        name: 'ONE OK ROCK',
        imgSrc: 'https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg'
      },
      {
        name: '青葉市子',
        imgSrc: 'https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg'
      },
      {
        name: 'Linked Horizon',
        imgSrc: 'https://m.media-amazon.com/images/I/318h4iu0jKL._SL160_.jpg'
      },
      {
        name: 'TUBE',
        imgSrc: 'https://m.media-amazon.com/images/I/51Mv2OA7hAL._SL160_.jpg'
      },
    ]
  )
  // const artistListKeys = Object.keys(artistList)
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Box bgcolor="#FFF">
          <Toolbar>
            <Link to="/">
              <Typography variant="h6" className={classes.title} >
                <Box textAlign="center" color="black">
                  Release Info
            </Box>
              </Typography>
            </Link>
            <Link to="/artist">
              <AccountBoxIcon />
            </Link>
          </Toolbar>
        </Box>
      </AppBar>
      {artistList.map((item, index) => (
        <Paper className={classes.paper} key={index}>
        <Grid container spacing={2}>
          <Grid item >
            <ButtonBase className={classes.image}>
              <img src={item.imgSrc} alt="img" height="100%" />
            </ButtonBase>
          </Grid>
          <Grid item xs={9} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="caption">
                  <Box fontWeight="fontWeightBold" lineHeight={1.2} paddingBottom={0.5}>
                    {item.name}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      ))}
    </div>
  );
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path="/" exact component={Home} />
          <Route path="/artist" component={Artist} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;