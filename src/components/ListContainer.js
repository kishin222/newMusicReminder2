import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 160px)",
    overflow: "scroll",
  },
});

export default function ListContainer(props) {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
}
