import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


const EventCard = (props) => {
  return (
    <Card sx={{ maxWidth: 250, height: 290 }}>
      <CardMedia
        component="img"
        style={{height: '140px'}}
        image={props.event.images[0].url}
      />
       <CardHeader
        title={props.event.name}
        // subheader={city}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {/* {description} */}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EventCard;