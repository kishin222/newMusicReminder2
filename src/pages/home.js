import React, { useState, useEffect } from "react";
import axios from "axios";
import useStyles from "../styles/useStyles";
import Header from "../header/header";

import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Card from "../components/Card";

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

const Home = () => {
  //シングル
  const [releaseInfo, setReleaseInfo] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        "https://new-music-notification-01.an.r.appspot.com/api/v1/releaseInfo/single"
      );
      // handle success
      setReleaseInfo(response.data);
    };
    getUser();
  }, []);
  const releaseInfoKeys = Object.keys(releaseInfo);
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
  const releaseInfoKeysAlbum = Object.keys(releaseInfoAlbum);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header />

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
        {releaseInfoKeys.map((item, index) => (
          <Card key={index} releaseDate={item} releaseInfo={releaseInfo}></Card>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {releaseInfoKeysAlbum.map((item, index) => (
          <Card
            key={index}
            releaseDate={item}
            releaseInfo={releaseInfoAlbum}
          ></Card>
        ))}
      </TabPanel>
    </>
  );
};

export default Home;
