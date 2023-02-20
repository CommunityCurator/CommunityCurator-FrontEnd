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


function Cards(props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {props.groupName}
        </Typography>
      
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {props.city}
        </Typography>
      </CardContent>
    </Card>

  );
}

export default Cards;