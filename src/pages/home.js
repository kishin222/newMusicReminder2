import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import axios from "axios";
import useStyles from "../styles/useStyles";
import Header from "../header/header";

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
      <Header />
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
    </div>
  );
}

export default Home;