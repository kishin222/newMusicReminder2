import { makeStyles } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
  },
  title: {
    flexGrow: 1,
    color: grey[700]
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 400,
  },
  image: {
    width: 64,
    height: 64,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  textGray: {
    color: "#5E5E5E",
    fontFamily: ["ヒラギノ角ゴ ProN"],
    margin: 20,
  },
  greenButton: {
    backgroundColor: "#1ED860",
    fontFamily: ["ヒラギノ角ゴ ProN"],
  },
  textWhite: {
    color: "#FFFFFF",
    fontFamily: ["ヒラギノ角ゴ ProN"],
    padding: 10,    
  },
  searchBox: {
    backgroundColor: theme.palette.background.paper,
    margin: 10,
  }
}));

export default useStyles;