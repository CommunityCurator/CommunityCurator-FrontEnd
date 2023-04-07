import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import './ShowPage.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MyGroupCard from '../../components/MyGroupCard/MyGroupCard';
import CategoryCard from '../../components/CategoryCard/CatgegoryCard';
import AddGroup from '../../components/AddGroup';
import SearchByCity from './SearchByCity';
import { Link } from 'react-router-dom';
import RecommendGroupCard from '../../components/RecommendGroupCard/RecommendGroupCard';
import LinearProgress from '@mui/material/LinearProgress';
import EventCard from '../../components/EventCard/EventCard';
import UserCategoryCard from '../../components/CategoryCard/UserCategoryCard';
import AddInterest from '../../components/AddInterest';

export default function ShowPage () {

  const [alertError, setAlertError] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [groups, setGroups] = useState(null)
  const [loadGroups, setLoadGroups] = useState(false)
  const [loadEvents, setLoadEvents] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const userId = parseInt(localStorage.getItem('currentUser'))
		fetch(`http://127.0.0.1:8000/api/user/${userId}`)
		.then(response => {
			if(response.status >= 400) {
			 setAlertError(true)  
			 return;
			}
			return response.json();
		})
		.then(data => {
      setUserInfo(data.user)
		})
	},[])

  useEffect(() => {
    setLoadGroups(true)
    const userId = parseInt(localStorage.getItem('currentUser'))
    const location = localStorage.getItem('location')
		fetch(`http://127.0.0.1:8000/api/groups/${location}/${userId}`)
		.then(response => {
			if(response.status > 400) {
			 setAlertError(true)
			 return;
			}
			return response.json();
		})
		.then(data => {
      const arr = data.group_city_user.slice(0,4);
      setGroups(arr)
          setLoadGroups(false)
		})
	},[groups])

  useEffect(() => {
    const userId = parseInt(localStorage.getItem('currentUser'))
		fetch(`http://127.0.0.1:8000/api/user/${userId}`)
		.then(response => {
			if(response.status >= 400) {
			 setAlertError(true)  
			 return;
			}
			return response.json();
		})
		.then(data => {
      setUserInfo(data.user)
		})
	},[])

  useEffect(() => {
    let pixel = ""
    setLoadEvents(true)
    if(localStorage.getItem('location') === 'Hialeah') {
      pixel = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=CX2QnrsxnXQY1zGYN1qkIi980HOGy5LI&city=Miami&`
    } else {
      pixel = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=CX2QnrsxnXQY1zGYN1qkIi980HOGy5LI&city=${localStorage.getItem('location')}&size=1`
    }
    
    fetch(pixel).then(response => {
      if(response.status >= 400) {
        setAlertError(true)  
        return;
       }
       return response.json();
    }).then(data => {
      let arr = data._embedded.events
      arr = [...new Map(arr.map(item =>
        [item['name'], item])).values()]

      arr = arr.reverse().slice(0,5);
      setEvents(arr)
    })
  },[])

  function newGroup(name, city, state, description){
    const url = 'http://localhost:8000/api/groups/';
    const data = {group_name: name, city: city, state: state, description: description};
    //need to figure out how to add categories and user
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if(!response.ok){
        console.log(data);
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
    return (
        <>
          <Snackbar
            anchorOrigin={{'horizontal' : 'center', 'vertical' : 'top'}}
            open={alertError}
            autoHideDuration={5000}
            onClose={() => setAlertError(false)}
          >
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert svariant="filled" onClose={() => setAlertError(false)} severity="error">
                <AlertTitle>Error</AlertTitle>
                  Invalid Email and Password Combination
              </Alert>
            </Stack>
			    </Snackbar>
          <div className="showpage">
            {userInfo ? (
              <Grid style={{marginLeft: '2em'}} container spacing={2}>
                <Grid item xs={3}>

                <div className="welcome-header">
                  <Typography variant="h4" gutterBottom>
                    Welcome {userInfo.first_name} {userInfo.last_name}!
                  </Typography>
                </div>

                <div style={{height: '3em'}}></div>
                  
                  <div style={{height: '1.5em'}}></div>
                  <SearchByCity/>
                  <div style={{height: '1.5em'}}></div>

                  <Typography variant="h7" gutterBottom>
                    Have an idea for a new group? Add it here!
                  </Typography>
                  <div style={{height: '.5em'}}></div>
                  <div>
                    <AddGroup newGroup={newGroup}/>
                  </div> 

                  <div style={{height: '1.5em'}}></div>  
                  <Typography variant="h5" gutterBottom>
                    Your Groups
                  </Typography>  
                  <div style={{height: '1.5em'}}></div> 
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    {userInfo.groups.length > 0 ? (
                      userInfo.groups.map(group => {
                        return (
                          <Grid >
                            <Link to={"/groups/" + group.id}>
                              <MyGroupCard group={group}></MyGroupCard>
                            </Link>
                          </Grid>
                        )
                      })) : ''}
                  </div>

                  <div style={{height: '1.5em'}}></div>  
                  <Typography variant="h5" gutterBottom>
                    Your Interests
                  </Typography>  
                  <div style={{height: '1.5em'}}></div> 
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    {userInfo.categories.length > 0 ? (
                      userInfo.categories.map(category => {
                        return (
                         
                            <UserCategoryCard name={category.name} />
                      
                        )
                      })) : ''}
                  <div>
                    <AddInterest/>
                  </div>                   
                </div>  
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <div style={{height: '50px'}}></div>  
                  <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                    Recommend groups in your area
                  </Typography>  
                  
                  {loadGroups && !groups ? (
                    <>
                      <div style={{height: '50px'}}></div> 
                      <LinearProgress color="secondary" />
                    </>
                    
                  ): "" }
                  
                  <Grid style={{width: '100%', paddingRight: '5em'}} container spacing={1}>
                    {groups ? (
                      groups.map(group => {  
                        return (
                          <Grid item xs={3}>
                            <Link to={"/groups/" + group.id}>
                            <RecommendGroupCard group={group}></RecommendGroupCard>
                            </Link>
                          </Grid>
                          )
                      })
                    ): ''}
                    
                  </Grid>
                  
                  <div style={{height: '50px'}}></div>  
                  <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                    Recommend events in your area.
                  </Typography>  

                  {loadEvents && !events ? (
                    <>
                      <div style={{height: '50px'}}></div> 
                      <LinearProgress color="secondary" />
                    </>
                    
                  ): "" }
                  
                  <Grid style={{width: '100%', paddingRight: '5em'}} container spacing={1}>
                  {events ? (
                      events.map((event, index) => {  
                        if(index !== 3) {
                          return (
                            <Grid item xs={3} style={{cursor: 'pointer'}}>
                              <a target="_blank" href={`${event.url}`}>
                              <EventCard event={event}></EventCard>
                              </a>
                            </Grid>
                          )
                        } else {
                          return
                        }
                      })
                    ): ''}
                      
                        
                  </Grid>
                </Grid>
              </Grid>
              
            ): ''}
          </div>
        </>
    )
}