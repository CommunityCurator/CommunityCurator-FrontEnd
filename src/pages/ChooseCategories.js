import React, { useState, useEffect, Link } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SearchByCity from './ShowPage/SearchByCity';
import AddCategoryCard from '../components/CategoryCard/AddCategoryCard';

export default function ChooseCategories(){

    const [list, setList] = useState();
    const url = 'http://localhost:8000/api/categories/';
    const userID = localStorage.getItem('currentUser');
    const home_url = '/user/'+userID;
  
    useEffect(() => {
      fetch(url)
        .then((response) => 
          response.json()
        )
        .then((data) => {
          console.log(data);
          setList(data.categories);
        })
  
    }, []);

  
    return(
      <>
      <div style={{height: '0.5em'}}></div>
      <SearchByCity />
      <div style={{height: '3.8em'}}></div>  
    
  
      <Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>        
        <Typography variant="h5" gutterBottom>
          Categories
        </Typography>        
      </Grid>
      
      <Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>
        {list ? list.map((category) => {
          return (
                <AddCategoryCard name={category.name} id={category.id}/>

          )
        }) : null}
      </Grid>
      </>
    );
}