import React from 'react'
import '../App.css'
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EventCard from '../components/EventCard/EventCard';


export default function Events(){
  const [list, setList] = useState();
  const [user, setUser]=useState();
  const [isLoaded, setIsLoaded]= useState(false);
  const userID = localStorage.getItem('currentUser');
  const url = 'http://localhost:8000/api/user/'+userID;

  useEffect(() => {
    fetch(url)
      .then((response) => 
        response.json()
      )
      .then((data) => {
        setUser(data);
      })

  }, []);

  useEffect(() => {
    if (user) {
      let pixel = "";
      setIsLoaded(true);
      pixel = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=CX2QnrsxnXQY1zGYN1qkIi980HOGy5LI&city=${user.user.city}`;
  
      fetch(pixel)
        .then((response) => {
          if (response.status >= 400) {
            setIsLoaded(false);
            return;
          }
          return response.json();
        })
        .then((data) => {
          if (data && data._embedded && data._embedded.events) {
            let arr = data._embedded.events;
            arr = [...new Map(arr.map((item) => [item["name"], item])).values()];
  
            arr = arr.reverse();
  
            setTimeout(() => {
              setIsLoaded(false);
              setList(arr);
            }, 1000);
          } else {
            setIsLoaded(false);
            setList([]);
          }
        });
    }
  }, [user]);

  return(
    <>

    <Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>        
      <Typography variant="h5" gutterBottom>
      <p>All Events in {user && user.user ? user.user.city : 'Loading...'}</p>
      </Typography>        
    </Grid>
    
    <Grid style={{width: '100%', paddingRight: '5em'}} container spacing={1}>
      {list && !isLoaded ? (
        list.map((event) => {  
            return (
              <Grid item xs={3} style={{cursor: 'pointer'}}>
                <a target="_blank" href={`${event.url}`}>
                  <EventCard event={event}></EventCard>
                </a>
              </Grid>
            )
          
        })
      ): (
            !isLoaded ? (
              <Typography style={{display: 'flex', justifyContent: 'center', width: '100%'}} variant="h6" gutterBottom>
                Error: No Events found in your area
              </Typography>
            ) : '' 
          )
        } 
      </Grid>
    </>
  );
}