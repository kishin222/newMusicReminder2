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
import { Link } from 'react-router-dom'
import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import CardActionArea from '@material-ui/core/CardActionArea';
// import { Button } from "@material-ui/core";
// import ClearIcon from '@material-ui/icons/Clear';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import Artist from "./pages/artist";
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

const Favorite = () => {
  //localstorageが空の場合に空の文字列を作成
  if (!localStorage.getItem("newMusicReminder")) {
    localStorage.setItem("newMusicReminder", '[]')
  }
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
  //お気に入りアーティストのCDがリリースされた日だけ抽出
  const favoriteSongReleaseDates = releaseDatesArray.filter((releaseDatesSplit, index) => {
    const releaseDaySplit = releaseInfoFavorite[releaseDatesSplit]
    return releaseDaySplit.length !== 0
  })
  //お気に入りアーティストのCDだけ含む新曲一覧作成
  let releaseInfoFavoriteValidDate = {}
  favoriteSongReleaseDates.forEach((releaseDate, index) => {
    releaseInfoFavoriteValidDate[releaseDate] = releaseInfoFavorite[releaseDate]
  })
  const classes = useStyles();
  let noNewFavoriteArtistReleaseMessage
  const validDate = Object.keys(releaseInfoFavoriteValidDate)
  if(validDate.length === 0){
    noNewFavoriteArtistReleaseMessage = <Box>お気に入りアーティストの新曲がありません</Box>
    // noArtistMessage = null
  }
  let noArtistMessage
  //ローカルストレージ呼び出し
  const artistsString = localStorage.getItem(`newMusicReminder`)
  const artists = JSON.parse(artistsString)
  if (!artists.length) {
    noArtistMessage = <div>
      <Box>お気に入りしたアーティストがありません</Box>
      <Box>お気に入りアーティストは、</Box>
      <Box>
        <Link to="/artist">
          <AccountBoxIcon />マイページ
        </Link>
        から登録してください
      </Box>
    </div>
    noNewFavoriteArtistReleaseMessage = null
  }
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
      {favoriteSongReleaseDates.map((item, index) => (
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
          {releaseInfoFavoriteValidDate[item].map((item2, index) => (
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
      {noArtistMessage}
      {noNewFavoriteArtistReleaseMessage}
    </div>
  );
}

export default Favorite;