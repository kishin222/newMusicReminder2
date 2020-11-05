import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useStyles from "./styles/useStyles";
import ButtonBase from "@material-ui/core/ButtonBase";

const Card = (props) => {
  const classes = useStyles();
  const { releaseDate, releaseInfo } = props;
  return (
    <>
      <Typography variant="subtitle2">
        <Box bgcolor="#f3f3f3" p={2} fontWeight="fontWeightBold" padding={1}>
          {releaseDate} 発売
        </Box>
      </Typography>
      {releaseInfo[releaseDate].map((item, index) => (
        <Paper>
          <Grid container>
            <Grid item>
              <img src={item.item} alt="img" height="100%" />
            </Grid>
            <Grid item xs={9}>
              <div key={index}>{item.title}</div>
            </Grid>
          </Grid>
        </Paper>
        // <Paper className={classes.paper} key={index}>
        //   <Grid
        //     container
        //     spacing={2}
        //     onClick={() => {
        //       const searchQuery =
        //         "https://www.google.com/search?q=" +
        //         item.title +
        //         " " +
        //         item.artist;
        //       window.open(searchQuery, "_blank");
        //     }}
        //   >
        //     <Grid item>
        //       <ButtonBase className={classes.image}>
        //         <img src={item.item} alt="img" height="100%" />
        //       </ButtonBase>
        //     </Grid>
        //     <Grid item xs={9} sm container alignItems="center" justify="center">
        //       <Grid item xs container direction="column" spacing={2}>
        //         <Grid item xs>
        //           <Typography variant="caption">
        //             <Box
        //               fontWeight="fontWeightBold"
        //               lineHeight={1.2}
        //               paddingBottom={0.5}
        //             >
        //               {item.title}
        //             </Box>
        //           </Typography>
        //           <Typography variant="caption" gutterBottom>
        //             <Box color="#4F4F4F">{item.artist}</Box>
        //           </Typography>
        //         </Grid>
        //       </Grid>
        //     </Grid>
        //   </Grid>
        // </Paper>
      ))}
    </>
  );
};

export default Card;
