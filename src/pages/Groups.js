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
import Comments from "../components/comments/Comments";

export default function Groups(){
  const [list, setList] = useState();
  const [groupLikes, setGroupLikes] = useState();

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

      fetch('http://localhost:8000/api/feedback/')
      .then((res) => 
      res.json()
      )
      .then((d) => {
        console.log('group likes:',d);
        setGroupLikes(d);
      })

  }, []);
 console.log('groupLikes', groupLikes);
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
                <Cards groupId={group.id} groupName={group.group_name} city={group.city} state={group.state}
                      image={group.image} 
                      Likes={groupLikes !== undefined && groupLikes.feedbacks.filter(feedback => feedback.like === true &&  feedback.group.id==group.id).length} 
                      Dislikes={groupLikes !== undefined && groupLikes.feedbacks.filter(feedback => feedback.dislike === true &&  feedback.group.id==group.id).length}/>


                {/* <Cards groupId={group.id} groupName={group.group_name} city={group.city} state={group.state}
                      image={group.image} /> */}
              </Link>
          </Grid>
        )
      }) : null}
    </Grid>
    </>
  );
}