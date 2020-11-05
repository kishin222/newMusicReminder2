import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import axios from "axios";
import useStyles from "../styles/useStyles";
import Header from "../header/header";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Card from "../Card";

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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));

// export default function FullWidthTabs() {

//   return (

//   );
// }

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

  const handleChangeIndex = (index) => {
    setValue(index);
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
            <Tab label="シングル" {...a11yProps(0)} />
            <Tab label="アルバム" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {releaseInfoKeys.map((item, index) => (
              <Card
                key={index}
                releaseDate={item}
                releaseInfo={releaseInfo}
              ></Card>
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
        </SwipeableViews>
      </div>
    </div>
  );
};

export default Home;
