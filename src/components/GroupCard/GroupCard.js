import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Icon_Thumbdown from '../../Icon_thumbdown';
import Icon_Thumbup from '../../Icon_thumbup';



const GroupCard = (props) => {

  const {city, group_name, description, image} = props.group
 
  return (
    <Card sx={{ maxWidth: 280, height: 350 }}>
      
    
      <CardMedia
        component="img"
        height="100"
        image={image}
      />
       <CardHeader
        title={group_name}
        subheader={city}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {description}
         
         <Icon_Thumbup />
        <Icon_Thumbdown />
        </Typography>
      </CardContent>
      
     
    </Card>
  )
}

export default GroupCard;