import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import axios from "axios";
import CardActionArea from "@material-ui/core/CardActionArea";
import ClearIcon from "@material-ui/icons/Clear";
import useStyles from "../styles/useStyles";
import Header from "../header/header";
import RecommendArtistCard from "../components/RecommendArtistCard";
import TabBar from "../components/TabBar";
import ListContainer from "../components/ListContainer";

const Artist = () => {
  const classes = useStyles();
  const [artistList, setArtistList] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        "https://new-music-notification-01.an.r.appspot.com/api/v1/artists"
      );
      // handle success
      setArtistList(response.data);
    };
    getUser();
  }, []);
  const artisistsNoDoyo = artistList.filter(function (artistsArray) {
    return artistsArray.name !== "童謡・唱歌";
  });
  //localstorageが空の場合に空の文字列を作成
  if (!localStorage.getItem("newMusicReminder")) {
    localStorage.setItem("newMusicReminder", "[]");
  }
  //localStorageからお気に入りアーティストをget
  const lsArtistsString = localStorage.getItem("newMusicReminder");
  const artisistsFavorite = JSON.parse(lsArtistsString);
  const artisistsNoBlank = artisistsFavorite.filter(function (a) {
    return a.name !== "";
  });
  const artisistsUnique = artisistsNoBlank.reduce((a, v) => {
    if (!a.some((e) => e.name === v.name)) {
      a.push(v);
    }
    return a;
  }, []);
  const newArtistsJson = JSON.stringify(artisistsUnique);
  localStorage.setItem("newMusicReminder", newArtistsJson);
  //お気に入りアーティストはアーティスト一覧から削除
  const artistsNoFavorite = artisistsNoDoyo.filter(function (artistsArray) {
    const favoriteArtistsName = artisistsUnique.map((artistText, index) => {
      return artistText.name;
    });
    return favoriteArtistsName.every((name) => name !== artistsArray.name);
  });
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            <Box
              bgcolor="#f3f3f3"
              p={2}
              fontWeight="fontWeightBold"
              padding={1}
            >
              お気に入りアーティスト
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <ListContainer>
        {artisistsUnique.map((item, index) => (
          <CardActionArea
            key={index}
            onClick={() => {
              const artistsString = localStorage.getItem(`newMusicReminder`);
              const artists = JSON.parse(artistsString);
              const artisistsDeleted = artists.filter(function (a) {
                return a.name !== item.name;
              });
              const newArtistsJson = JSON.stringify(artisistsDeleted);
              localStorage.setItem("newMusicReminder", newArtistsJson);
            }}
          >
            <Paper className={classes.paper}>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item>
                  <img src={item.imgSrc} alt="img" width="75" height="75" />
                </Grid>
                <Grid item xs={8} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="caption">
                        <Box
                          fontWeight="fontWeightBold"
                          lineHeight={1.2}
                          paddingBottom={0.5}
                        >
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
              <Box
                bgcolor="#f3f3f3"
                p={2}
                fontWeight="fontWeightBold"
                padding={1}
              >
                おすすめアーティスト
              </Box>
            </Typography>
          </Grid>
        </Grid>
        {artistsNoFavorite.map((item, index) => (
          <RecommendArtistCard
            key={index}
            name={item.name}
            imgSrc={item.imgSrc}
          />
        ))}
      </ListContainer>
      <TabBar />
    </>
  );
};

export default Artist;
