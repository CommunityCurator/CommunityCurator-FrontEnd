import React from 'react'
import '../App.css'
import { useEffect, useState } from "react";
import { json, Link } from 'react-router-dom';
import AddGroup from '../components/AddGroup';
import Cards from '../components/Cards/Cards';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchByCity from './ShowPage/SearchByCity';


export default function Groups(){
  const [list, setList] = useState();
  const url = 'http://localhost:8000/api/groups/';

  useEffect(() => {
    fetch(url)
      .then((response) => 
        response.json()
      )
      .then((data) => {
        console.log(data);
        setList(data.groups);
      })

  }, []);

  return(
    <>
    <div style={{height: '0.5em'}}></div>
    <SearchByCity />
    <div style={{height: '3.8em'}}></div>  
  

    <Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>        
      <Typography variant="h5" gutterBottom>
        Groups
      </Typography>        
    </Grid>
    
    <Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>
      {list ? list.map((group) => {
        return (
          <Grid item xs={3}>
              <Link to={"/groups/" + group.id}>
                <Cards groupName={group.group_name} city={group.city} state={group.state}
                      image={group.image}/>
              </Link>
          </Grid>
        )
      }) : null}
    </Grid>
    </>
  );
}