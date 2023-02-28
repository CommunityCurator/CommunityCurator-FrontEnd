import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


const MyGroupCard = (props) => {

  const {city, group_name, description, image} = props.group
  
  return (
    <>
      <Card variant="outlined">
      <CardContent>
       <div style={{display: 'flex'}}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image}
        />
        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10%'}}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {group_name}
          </Typography>
        </div>
      </div>
      </CardContent>
      </Card>
    </>
  )
}

export default MyGroupCard;