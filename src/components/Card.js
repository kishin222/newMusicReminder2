import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Card = (props) => {
  const { releaseDate, releaseInfo } = props;
  const infoPapers = releaseInfo[releaseDate].map((item, index) => (
    <Paper key={index}>
      <Grid
        container
        spacing={2}
        onClick={() => {
          const searchQuery =
            "https://www.google.com/search?q=" + item.title + " " + item.artist;
          window.open(searchQuery, "_blank");
        }}
      >
        <Grid item>
          <img src={item.imgSrc} alt="img" width="65" height="65" />
        </Grid>
        <Grid item xs={9} container alignItems="flex-start" justify="center" direction="column">
          <Typography variant="caption" component="div" >
            <Box fontWeight="fontWeightBold" >
              {item.title}
            </Box>
          </Typography>
          <Typography variant="caption" component="div">
            {item.artist}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  ));

  return (
    <>
      <Typography variant="subtitle2">
        <Box bgcolor="#f3f3f3" p={2} fontWeight="fontWeightBold" padding={1}>
          {releaseDate} 発売
        </Box>
      </Typography>
      {infoPapers}
    </>
  );
};

export default Card;
