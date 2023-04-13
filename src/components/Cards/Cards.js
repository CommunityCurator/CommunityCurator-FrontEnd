/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

function Cards(props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Avatar 
          src={props.image} 
          sx={{ width: 56, height: 56 }}
        />

        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {props.groupName}
        </Typography>
      
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {props.city}, {props.state}
        </Typography>
      </CardContent>
    </Card>

  );
}

export default Cards;