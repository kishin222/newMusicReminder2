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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import { useTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles2 = makeStyles((theme) => ({
  textField: {
    width: "100%",
  },

}));
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
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Artist = () => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const theme = useTheme();
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = React.useState(0);  

return (
  <>
    <Header />
    <form className={classes.searchBox} noValidate autoComplete="off" >
      <TextField className={classes2.textField} id="outlined-basic" label="アーティストを検索" variant="outlined" />
    </form>
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="お気に入り" />
        <Tab label="その他" />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0} dir={theme.direction}>
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
      </ListContainer>
    </TabPanel>
    <TabPanel value={value} index={1} dir={theme.direction}>
      <ListContainer>
        {artistsNoFavorite.map((item, index) => (
          <RecommendArtistCard
            key={index}
            name={item.name}
            imgSrc={item.imgSrc}
          />
        ))}
      </ListContainer>
    </TabPanel>
    <TabBar />
  </>
);
};
export default Artist;
