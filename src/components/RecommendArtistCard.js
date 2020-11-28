import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from "../styles/useStyles";

const RecommendArtistCard = (props) => {
  const classes = useStyles();
  const { name, imgSrc } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const addFavoriteArtist = () => {
    //localStorageに新しいお気に入りアーティストをset
    const artistsString = localStorage.getItem(`newMusicReminder`);
    const artists = JSON.parse(artistsString);
    const newArtists = [
      ...artists,
      {
        name: name,
        imgSrc: imgSrc,
      },
    ];
    const newArtistsJson = JSON.stringify(newArtists);
    localStorage.setItem("newMusicReminder", newArtistsJson);
    setIsFavorite(true);
  };

  return (
    <CardActionArea onClick={addFavoriteArtist}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <img src={imgSrc} alt="img" height="75" width="75" />
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
                    {name}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Grid>
        </Grid>
      </Paper>
    </CardActionArea>
  );
};

export default RecommendArtistCard;
