import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { set } from 'react-hook-form';

const AddCategoryCard = (props) => {

  function addInterest(id) {
    props.updateList(id)
  }

  return (
    <>
      <Card variant="outlined" style={{ margin: '1em' }}>
        <CardContent>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                {props.category.name}
            </Typography>
            <Button onClick={() => addInterest(props.category)} size="small" variant="outlined">Add</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AddCategoryCard;
