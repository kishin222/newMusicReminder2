import React from "react";
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import useStyles from "../styles/useStyles";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const About = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h4' align='center' className={classes.textGray}><br/>ようこそ、<br/>LISNAへ<br/><br/></Typography>
      <Box align='center'>
        <img src="/lisna_logo_v3.png" alt="img" width="150"/>
      </Box>
      <Typography variant='h4' align='center' className={classes.textGray}><br/></Typography>
      <Box align='center'>
        <img src="/screenShot.png" alt="img" width="300"/>
      </Box>
      <Typography variant='body2' align='center'className={classes.textGray}>
        LISNA（リスナ）は、<br/>
        Official髭男dism、King Gnu、菅田将暉、<br/>
        あいみょんなど400組以上のアーティスト、<br/>
        600枚以上の最新リリースCDが集まる<br/>
        新曲まとめサイトです。
      </Typography>
      <Typography variant='h4' align='center'className={classes.textGray}>
        <br/>LISNA<br/>便利な3つの機能<br/><br/>
      </Typography>
      <Box align='center'>
        <img src="/favoriteIcon.png" alt="img" width="100"/>
      </Box>
      <Typography variant='h5' align='center'className={classes.textGray}>
        好みのアーティストを<br/>お気に入り
      </Typography>
      <Typography variant='body2' align='center'className={classes.textGray}>
        まずは自分の好きなアーティストを<br/>
        お気に入り登録<br/>
        お気に入りアーティストに絞り込んで<br/>
        新曲リストを確認できます
      </Typography>
      <Typography variant='h4' align='center' className={classes.textGray}><br/></Typography>
      <Box align='center'>
        <img src="/searchIcon.png" alt="img" width="100"/>
      </Box>
      <Typography variant='h5' align='center'className={classes.textGray}>
        気になった曲はすぐ検索
      </Typography>
      <Typography variant='body2' align='center'className={classes.textGray}>
        新曲の一覧からすぐ検索<br/>
        お好きなサービスで新曲を確認できます
      </Typography>
      <Typography variant='h4' align='center' className={classes.textGray}><br/></Typography>
      <Box align='center'>
        <img src="/pushIcon.png" alt="img" width="100"/>
      </Box>
      <Typography variant='h5' align='center'className={classes.textGray}>
        新曲通知が届く<br/>
        （準備中）
      </Typography>
      <Typography variant='body2' align='center'className={classes.textGray}>
        一度お気に入りアーティストを設定したら<br/>
        次から自動的にお知らせ<br/>
        注目の新譜を見逃すことはありません
      </Typography>
      <Typography variant='h4' align='center' className={classes.textGray}><br/></Typography>
      <Box align='center'>
        <Button
          className={classes.greenButton}
          p={2}
          padding={1}
          align='center'
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant='h5' className={classes.textWhite}>
              さあ、すぐに始めよう
            </Typography>
          </Link>
        </Button>
      </Box>
      <Typography variant='h4' align='center' className={classes.textGray}><br/></Typography>

    </>
  );
};

export default About;