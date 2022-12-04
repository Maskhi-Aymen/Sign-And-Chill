import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';

export default function MeditateCard({title,intro,img,song}) {
  return (
    <Card sx={{ width: 300,height:300 ,backgroundColor :"transparent" ,border:'#9D8189 2px solid',borderRadius:5}}>
      <CardActionArea sx={{backgroundColor :"transparent" }}>
        <CardMedia
          component="img"
          height="170"
          image={img}
          alt="green iguana"
        /> 
      </CardActionArea ><CardContent sx={{backgroundColor: 'neutral.contrastText', opacity: 0.7 }}>
          <Typography gutterBottom variant="h5" component="div">
          {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {intro}
          </Typography>
        </CardContent>
      <CardActions sx={{backgroundColor: 'neutral.contrastText',border:'transparent', opacity: 0.9,justifyContent:"center"}}>
        <PlayCircleFilledWhiteSharpIcon />
      </CardActions>
    </Card>
  );
}
