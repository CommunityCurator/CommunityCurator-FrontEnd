import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const UserCategoryCard = (props) => {

  function removeInterest() {
    const userId = parseInt(localStorage.getItem('currentUser'))
    let url = `http://127.0.0.1:8000/api/user/${userId}/categories`;

    fetch(url)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        for(var key in data.categories) {
            if(data.categories[key].name == props.name) {
                url += "/" + data.categories[key].id
                return url
            }
        }
    })
    .then(url => {
      fetch(url, {
        method: "DELETE",
        headers : {      
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
      .then((response) => {
          console.log(url)
      })
    })
  }

  return (
    <>
      <Card variant="outlined" style={{marginTop: '0.5em'}}>
        <CardContent>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                {props.name}
            </Typography>
            <Button onClick={removeInterest} size="small" variant="outlined">Remove</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UserCategoryCard;