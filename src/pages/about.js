import React from "react";
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';

const About = () => {
  return (
    <>
    <Typography variant='h3' align='center'>ようこそ、<br/>LISNAへ</Typography>
    <Box>
      <img src="/lisna_logo_v3.png" alt="img" width="100"/>
    </Box>
    <Box>
      <img src="/screenShot.png" alt="img" width="200"/>
    </Box>
    <Typography variant='body1' align='center'>
      LISNA（リスナ）は、<br/>
      Official髭男dism、King Gnu、菅田将暉、<br/>
      あいみょんなど400組以上のアーティスト、<br/>
      600枚以上の最新リリースCDが集まる<br/>
      新曲まとめサイトです。
    </Typography>
    <Typography variant='h5' align='center'>
      LISNA<br/>
      便利な3つの機能
    </Typography>

    </>
  );
};

export default About;