import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const UserCategoryCard = (props) => {
  const [isHover, setIsHover] = React.useState(false)

  return (
    <>
      <Card variant="outlined" style={{marginTop: '1em'}}>
      <CardContent>
        {isHover == false && (        
        <Typography style={{textAlign: 'center'}} sx={{ fontSize: 18 }} color="text.secondary" gutterBottom
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
            {props.name}
        </Typography>)}

        {isHover && (
        <Typography style={{textAlign: 'center'}} sx={{ fontSize: 18 }} color="text.secondary" gutterBottom
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            Remove Interest
        </Typography>)
        }
        {/* <Typography variant="h5" component="div">
          
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
        </Typography>
        <Typography variant="body2">
        
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </>
  )
}

export default UserCategoryCard;