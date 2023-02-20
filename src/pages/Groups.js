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

  function newGroup(name, city, description){
    const data = {groupName: name, city: city, description: description};
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if(!response.ok){
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      //assume the add was succesful
    })
    .catch((e) => {
      console.log(e);
    });
  }

  return(
    <>
    <h5>Groups registered on community curator</h5>
    <Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>
    {list ? list.map((group) => {
      return (
        <Grid item xs={3} >
            <Link to={"/groups/" + group.id}>
              <Cards groupName={group.groupName} city={group.city} state={group.state}
                     image={group.image}/>
            </Link>
        </Grid>

      )
    }) : null}
    </Grid>
    <AddGroup newGroup={newGroup}/>
    </>
  );
}

