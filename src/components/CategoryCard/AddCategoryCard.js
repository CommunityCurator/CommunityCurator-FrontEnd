import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { set } from 'react-hook-form';


const AddCategoryCard = (props) => {
  const [isHover, setIsHover] = useState(false)

  function addInterest() {
    const userId = parseInt(localStorage.getItem('currentUser'))
    const url1 = 'http://localhost:8000/api/categories';
    let url2 = `http://127.0.0.1:8000/api/user/${userId}/categories`;

    fetch(url1)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        for(var key in data.categories) {
            if(data.categories[key].name == props.name) {
                const id = props.id
                url2 += "/" + data.categories[key].id
                console.log("**********")
                console.log(url2)
                return url2
            }
        }
    })
    .then(url => {
      fetch(url, {
        method: "POST",
        headers : {      
            'Content-Type': 'application/json'
        }
      })
      .then((response) => {
          console.log(url)
          console.log(props.id)
      })
      
    })
  }

  return (
    <>
      <Card variant="outlined" style={{margin: '1em'}}>
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
            <button onClick={addInterest}>
                Add Interest
            </button>
        </Typography>)
        }
      </CardContent>
      </Card>
    </>
  )
}

export default AddCategoryCard;