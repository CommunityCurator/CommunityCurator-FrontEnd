import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const UserCategoryCard = (props) => {
  
  const {id, name, created_at} = props.category

  return (
    <>
      <Card variant="outlined" style={{marginTop: '0.5em'}}>
        <CardContent>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                {name}
            </Typography>
            <Button onClick={() => props.handleDeleteCategory(id)} size="small" variant="outlined">Remove</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UserCategoryCard;