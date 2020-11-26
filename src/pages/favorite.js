import React, { useState, useEffect } from "react";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { Link } from 'react-router-dom'
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import useStyles from "../styles/useStyles";
import Header from "../header/header";
import { useTheme } from "@material-ui/core/styles";
import Card from "../Card";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const Favorite = () => {
  //localstorageが空の場合に空の文字列を作成
  if (!localStorage.getItem("newMusicReminder")) {
    localStorage.setItem("newMusicReminder", '[]')
  }
  //シングル
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
    noNewFavoriteArtistReleaseMessage = <Box>お気に入りアーティストのニューシングルがありません</Box>
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
  //アルバム
  const [releaseInfoAlbum, setReleaseInfoAlbum] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        "https://new-music-notification-01.an.r.appspot.com/api/v1/releaseInfo/album"
      );
      // handle success
      setReleaseInfoAlbum(response.data);
    };
    getUser();
  }, []);
  const releaseDatesArrayAlbum = Object.keys(releaseInfoAlbum);
  //新しく書く部分
  const favoriteReleaseSongPerDatesAlbum = releaseDatesArrayAlbum.map((releaseDatesSplitAlbum, index) => {
    return releaseInfoAlbum[releaseDatesSplitAlbum].filter(function (releaseSongSplitAlbum) {
      //ローカルストレージ呼び出し
      const artistsString = localStorage.getItem(`newMusicReminder`)
      const artists = JSON.parse(artistsString)
      const artistFavoriteArrayAlbum = artists.map((artistText, index) => {
        return artistText.name;
      })
      return artistFavoriteArrayAlbum.some(artistName => artistName === releaseSongSplitAlbum.artist)
    })
  })
  //日付をオブジェクトのキーにする
  let releaseInfoFavoriteAlbum = {}
  releaseDatesArrayAlbum.forEach((releaseDateAlbum, index) => {
    releaseInfoFavoriteAlbum[releaseDateAlbum] = favoriteReleaseSongPerDatesAlbum[index]
    releaseDateAlbum = favoriteReleaseSongPerDatesAlbum[index]
  });
  //お気に入りアーティストのCDがリリースされた日だけ抽出
  const favoriteSongReleaseDatesAlbum = releaseDatesArrayAlbum.filter((releaseDatesSplitAlbum, index) => {
    const releaseDaySplitAlbum = releaseInfoFavoriteAlbum[releaseDatesSplitAlbum]
    return releaseDaySplitAlbum.length !== 0
  })
  //お気に入りアーティストのCDだけ含む新曲一覧作成
  let releaseInfoFavoriteValidDateAlbum = {}
  favoriteSongReleaseDatesAlbum.forEach((releaseDateAlbum, index) => {
    releaseInfoFavoriteValidDateAlbum[releaseDateAlbum] = releaseInfoFavoriteAlbum[releaseDateAlbum]
  })
  let noNewFavoriteArtistReleaseMessageAlbum
  const validDateAlbum = Object.keys(releaseInfoFavoriteValidDateAlbum)
  if(validDateAlbum.length === 0){
    noNewFavoriteArtistReleaseMessageAlbum = <Box>お気に入りアーティストのニューアルバムがありません</Box>
    // noArtistMessage = null
  }
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="シングル" />
            <Tab label="アルバム" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {favoriteSongReleaseDates.map((item, index) => (
            <Card
              key={index}
              releaseDate={item}
              releaseInfo={releaseInfoFavoriteValidDate}
            ></Card>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {favoriteSongReleaseDatesAlbum.map((item, index) => (
            <Card
              key={index}
              releaseDate={item}
              releaseInfo={releaseInfoFavoriteValidDateAlbum}
            ></Card>
          ))}
        </TabPanel>
      </div>
      {noArtistMessage}
      {noNewFavoriteArtistReleaseMessage}
      {noNewFavoriteArtistReleaseMessageAlbum}
    </div>
  );
  // return (
  //   <div className={classes.root}>
  //     <Header />
  //     {favoriteSongReleaseDates.map((item, index) => (
  //       <div key={index}>
  //         <Grid container spacing={3}>
  //           <Grid item xs={12}>
  //             <Typography variant="subtitle2">
  //               <Box bgcolor="#f3f3f3" p={2} fontWeight="fontWeightBold" padding={1} >
  //                 {item} 発売
  //               </Box>
  //             </Typography>
  //           </Grid>
  //         </Grid>
  //         {releaseInfoFavoriteValidDate[item].map((item2, index) => (
  //           <Paper className={classes.paper} key={index}>
  //             <Grid container spacing={2}>
  //               <Grid item >
  //                 <ButtonBase className={classes.image}>
  //                   <img src={item2.imgSrc} alt="img" height="100%" />
  //                 </ButtonBase>
  //               </Grid>
  //               <Grid item xs={9} sm container alignItems="center" justify="center">
  //                 <Grid item xs container direction="column" spacing={2}>
  //                   <Grid item xs>
  //                     <Typography variant="caption">
  //                       <Box fontWeight="fontWeightBold" lineHeight={1.2} paddingBottom={0.5}>
  //                         {item2.title}
  //                       </Box>
  //                     </Typography>
  //                     <Typography variant="caption" gutterBottom >
  //                       <Box color="#4F4F4F">
  //                         {item2.artist}
  //                       </Box>
  //                     </Typography>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //           </Paper>
  //         ))}
  //       </div>
  //     ))}
  //     {noArtistMessage}
  //     {noNewFavoriteArtistReleaseMessage}
  //   </div>
  // );
}

export default Favorite;