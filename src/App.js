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
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CardActionArea from '@material-ui/core/CardActionArea';
import { Button } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
      const response = await axios.get('https://new-music-notification-01.an.r.appspot.com/api/v1/releaseInfo/single');
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
            <Link to="/favorite">
              <FavoriteIcon />
            </Link>
            <Typography variant="h6" className={classes.title} >
              <Link to="/">
                <Box textAlign="center" color="black">
                  Music Release Info
                </Box>
              </Link>
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
                <Grid item xs={9} sm container alignItems="center" justify="center">
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
      <Button href='https://new-music-notification-01.an.r.appspot.com/api/v1/releaseInfo/single'>
        新曲一覧が表示されない場合、一度こちらをクリックした後、このページを再読み込みしてください
      </Button>
    </div>
  );
}

const Artist = () => {
  const classes = useStyles();
  const [artistList, setArtistList] = useState([])
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('https://new-music-notification-01.an.r.appspot.com/api/v1/artists');
      // handle success
      setArtistList(response.data)
    }
    getUser()
  }, [])
  const artisistsNoDoyo = artistList.filter(function (artistsArray) {
    return artistsArray.name !== "童謡・唱歌";
  })
  if (!localStorage.getItem("newMusicReminder")) {
    localStorage.setItem("newMusicReminder", '[]')
  }
  //localStorageからお気に入りアーティストをget
  const lsArtistsString = localStorage.getItem("newMusicReminder")
  const artisistsFavorite = JSON.parse(lsArtistsString)
  const artisistsNoBlank = artisistsFavorite.filter(function (a) {
    return a.name !== "";
  })
  const artisistsUnique = artisistsNoBlank.reduce((a, v) => {
    if (!a.some((e) => e.name === v.name)) {
      a.push(v);
    }
    return a;
  }, [])
  const newArtistsJson = JSON.stringify(artisistsUnique)
  localStorage.setItem('newMusicReminder', newArtistsJson)
  return (
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
                  Music Release Info
                </Box>
              </Link>
            </Typography>
            <Link to="/artist">
              <AccountBoxIcon />
            </Link>
          </Toolbar>
        </Box>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            <Box bgcolor="#f3f3f3" p={2} fontWeight="fontWeightBold" padding={1} >
              お気に入りアーティスト
                </Box>
          </Typography>
        </Grid>
      </Grid>
      {artisistsUnique.map((item, index) => (
        <CardActionArea key={index} onClick={() => {
          const artistsString = localStorage.getItem(`newMusicReminder`)
          const artists = JSON.parse(artistsString)
          const artisistsDeleted = artists.filter(function (a) {
            return a.name !== item.name;
          })
          const newArtistsJson = JSON.stringify(artisistsDeleted)
          localStorage.setItem('newMusicReminder', newArtistsJson)
        }}>
          <Paper className={classes.paper}>
            <Grid container spacing={2} alignItems="center" justify="center">
              <Grid item >
                <ButtonBase className={classes.image}>
                  <img src={item.imgSrc} alt="img" height="100%" />
                </ButtonBase>
              </Grid>
              <Grid item xs={8} sm container>
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
              <ClearIcon></ClearIcon>
            </Grid>
          </Paper>
        </CardActionArea>
      ))}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            <Box bgcolor="#f3f3f3" p={2} fontWeight="fontWeightBold" padding={1} >
              アーティスト一覧
                </Box>
          </Typography>
        </Grid>
      </Grid>
      {artisistsNoDoyo.map((item, index) => (
        <CardActionArea key={index} onClick={() => {
          //localStorageに新しいお気に入りアーティストをset
          const artistsString = localStorage.getItem(`newMusicReminder`)
          const artists = JSON.parse(artistsString)
          const newArtists = [...artists,
          {
            name: item.name,
            imgSrc: item.imgSrc
          }
          ]
          const newArtistsJson = JSON.stringify(newArtists)
          localStorage.setItem('newMusicReminder', newArtistsJson)
        }}>
          <Paper className={classes.paper}>
            <Grid container spacing={2} alignItems="center" justify="center">
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
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </Grid>
            </Grid>
          </Paper>
        </CardActionArea>
      ))}
      <Button href='https://new-music-notification-01.an.r.appspot.com/api/v1/artists'>
        アーティスト一覧が表示されない場合、一度こちらをクリックした後、このページを再読み込みしてください
      </Button>
    </div>
  );
}

const Favorite = () => {
  const [releaseInfo, setReleaseInfo] = useState({
  })
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('https://new-music-notification-01.an.r.appspot.com/api/v1/releaseInfo/single');
      // handle success
      setReleaseInfo(response.data)
    }
    getUser()
  }, [])

  //objectKeys => Map => filter
  const releaseDatesArray = Object.keys(releaseInfo)
  const favoriteReleaseSongPerDates = releaseDatesArray.map((releaseDatesSplit, index) => {
    // console.log(releaseDatesSplit)
    return releaseInfo[releaseDatesSplit].filter(function (releaseSongSplit) {
      //ローカルストレージ呼び出し
      const artistsString = localStorage.getItem(`newMusicReminder`)
      const artists = JSON.parse(artistsString)
      const artistFavoriteArray = artists.map((artistText, index) => {
        return artistText.name;
      })
      return artistFavoriteArray.some(artistName => artistName === releaseSongSplit.artist)
    })
  })
  //日付をオブジェクトのキーにする
  let releaseInfoFavorite = {}
  releaseDatesArray.forEach((releaseDate, index) => {
    releaseInfoFavorite[releaseDate] = favoriteReleaseSongPerDates[index]
    releaseDate = favoriteReleaseSongPerDates[index]
  });
  // console.log(releaseInfoFavorite)
  //新曲がない日を除外したリストを作る
  //①日付ごとに操作できるように、releaseDatesArrayを1日ずつにばらけさせる
  const favoriteReleaseSongPerValidDates = releaseDatesArray.map((releaseDatesSplit, index) => {
    //②論理値でお気に入りアーティストの新譜がある日だけ返ってくるようfilter
    let releaseDaySplit = releaseInfoFavorite[releaseDatesSplit]
    return releaseDaySplit.filter(releaseDaySplit => releaseDaySplit.length !== 0)
  })
  console.log(favoriteReleaseSongPerValidDates)
  const classes = useStyles();
  return (
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
                  Music Release Info
                </Box>
              </Link>
            </Typography>
            <Link to="/artist">
              <AccountBoxIcon />
            </Link>
          </Toolbar>
        </Box>
      </AppBar>
      {releaseDatesArray.map((item, index) => (
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
          {releaseInfoFavorite[item].map((item2, index) => (
            <Paper className={classes.paper} key={index}>
              <Grid container spacing={2}>
                <Grid item >
                  <ButtonBase className={classes.image}>
                    <img src={item2.imgSrc} alt="img" height="100%" />
                  </ButtonBase>
                </Grid>
                <Grid item xs={9} sm container alignItems="center" justify="center">
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
      <Button href='https://new-music-notification-01.an.r.appspot.com/api/v1/releaseInfo/single'>
        新曲一覧が表示されない場合、一度こちらをクリックした後、このページを再読み込みしてください
      </Button>
    </div>
  );
}

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