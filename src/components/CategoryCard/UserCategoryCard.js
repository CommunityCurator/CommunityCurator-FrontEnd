import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const UserCategoryCard = (props) => {
  const [isHover, setIsHover] = React.useState(false)

  function removeInterest() {
    const userId = parseInt(localStorage.getItem('currentUser'))
    const url = `http://127.0.0.1:8000/api/user/${userId}/categories`;

    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        for(var key in data.categories) {
            if(data.categories[key].name == props.name) {
                console.log(data.categories[key].id)
            }
        }
    })
    
    // Append category id to URL
    // Call the DELETE view
    // Remove from user
  }

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
            <button onClick={removeInterest}>
                Remove Interest
            </button>
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