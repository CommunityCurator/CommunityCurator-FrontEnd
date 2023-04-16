import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import './ShowPage.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MyGroupCard from '../../components/MyGroupCard/MyGroupCard';
import AddGroup from '../../components/AddGroup';
import SearchByCity from './SearchByCity';
import { Link } from 'react-router-dom';
import RecommendGroupCard from '../../components/RecommendGroupCard/RecommendGroupCard';
import LinearProgress from '@mui/material/LinearProgress';
import EventCard from '../../components/EventCard/EventCard';
import UserCategoryCard from '../../components/CategoryCard/UserCategoryCard';
import AddInterest from '../../components/AddInterest';

export default function ShowPage () {

  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState([])
  const [type, setType] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [groups, setGroups] = useState(null)
  const [events, setEvents] = useState(null)
  const [categories, setCategories] = useState([])
  const [loadGroups, setLoadGroups] = useState(false)
  const [loadEvents, setLoadEvents] = useState(false)

  const [recGroups, setRecGroups] = useState([])
  const [loadRec, setloadRec] = useState(false)

  const userId = parseInt(localStorage.getItem('currentUser'))

  useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/user/${userId}`)
		.then(response => {
			if(response.status >= 400) {
        displayAlert('error', 'User not found')
			 return;
			}
			return response.json();
		})
		.then(data => {
      setCategories(data.user.categories)
      setUserInfo(data.user)
		})
	},[])

  useEffect(() => {
    setLoadGroups(true)
    const location = localStorage.getItem('location')
		fetch(`http://127.0.0.1:8000/api/groups/${location}/${userId}`)
		.then(response => {
			if(response.status >= 400) {
        setLoadGroups(false)
			  return;
			}
			return response.json();
		})
		.then(data => {
      setTimeout(() => {
        const arr = data.group_city_user.slice(0,4);
        setGroups(arr)
        setLoadGroups(false)
      }, 1000)  
		})
	},[])

  useEffect(() => {
    if(userInfo) {
      let pixel = ""
      setLoadEvents(true)
      pixel = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=CX2QnrsxnXQY1zGYN1qkIi980HOGy5LI&city=${userInfo.city}`
      
      fetch(pixel).then(response => {
        if(response.status >= 400) {
          setLoadEvents(false)
          return;
         }
         return response.json();
      }).then(data => {
        let arr = data._embedded.events
        arr = [...new Map(arr.map(item =>
          [item['name'], item])).values()]
  
        arr = arr.reverse().slice(0,5);

        setTimeout(() => {
          setLoadEvents(false)
          setEvents(arr)
        }, 1000)
      })
    }
   
  },[userInfo])

  useEffect(() => {
    setloadRec(true);
		fetch(`http://127.0.0.1:8000/api/recommended/${userId}`)
		.then(response => {
			if(response.status > 400) {
      setloadRec(false);
			 return;
			}
			return response.json();
		})
		.then(data => {
      const arr = data.groups.slice(0,8);
      setRecGroups(arr);
      setloadRec(false);
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

  const handleDeleteCategory = (id) => {
    fetch(`http://127.0.0.1:8000/api/user/${userId}/categories/${id}`, {
      method: "DELETE",
        headers : {      
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      let cloneCategories = [...categories]
      cloneCategories = cloneCategories.filter(category => {
        if(category.id !== id) {
          return category
        }
      })
      
      setCategories(cloneCategories)
      displayAlert('success', 'Interest has been removed')

    })
  }

  const displayAlert = (type, userMessage) => {
    if(type && userMessage) {
      setAlert(true)
      setType(type)
      setMessage(userMessage)
    } 
  }

    return (
        <>
        <Snackbar
          anchorOrigin={{'horizontal' : 'center', 'vertical' : 'top'}}
          open={alert}
          autoHideDuration={5000}
          onClose={() => setAlert(false)}
        >
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert svariant="filled" onClose={() => setAlert(false)} severity={type}>
              {message}
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

                  <div style={{height: '2em'}}></div>
                  
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
                    {categories.length > 0 ? (
                      categories.map((category, index) => {
                        return (
                          <UserCategoryCard key={`${category}${index}`} handleDeleteCategory={handleDeleteCategory} category={category} />
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
                    {groups && !loadGroups ? (
                      groups.map(group => {  
                        return (
                          <Grid item xs={3}>
                            <Link to={"/groups/" + group.id}>
                            <RecommendGroupCard group={group}></RecommendGroupCard>
                            </Link>
                          </Grid>
                          )
                      })
                    ): (
                      !loadGroups ? (
                        <Typography style={{display: 'flex', justifyContent: 'center', width: '100%'}} variant="h6" gutterBottom>
                        Error: No groups found
                      </Typography>
                      ) : ''
                    )}  
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
                  {events && !loadEvents ? (
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
                    ): (
                      !loadEvents ? (
                        <Typography style={{display: 'flex', justifyContent: 'center', width: '100%'}} variant="h6" gutterBottom>
                        Error: No Events found in your area
                      </Typography>
                      ) : '' 
                    )
                  } 
                  </Grid>
                  
                  <div style={{height: '50px'}}></div>  
                  <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                    Recommend groups based on interests
                  </Typography>  
                  
                  {loadRec && !recGroups ? (
                    <>
                      <div style={{height: '50px'}}></div> 
                      <LinearProgress color="secondary" />
                    </>
                    
                  ): "" }
                  
                  <Grid style={{width: '100%', paddingRight: '5em'}} container spacing={1}>
                    {recGroups.length > 0 && !loadRec ? (
                      recGroups.map(group => {  
                        return (
                          <Grid item xs={3}>
                            <Link to={"/groups/" + group.id}>
                            <RecommendGroupCard group={group}></RecommendGroupCard>
                            </Link>
                          </Grid>
                          )
                      })
                    ): (
                      <Typography style={{display: 'flex', justifyContent: 'center', width: '100%'}} variant="h6" gutterBottom>
                        Error: No recommended groups
                    </Typography>
                    )}
                    
                  </Grid>

                </Grid>
              </Grid>
              
            ): ''}
          </div>
        </>
    )
}