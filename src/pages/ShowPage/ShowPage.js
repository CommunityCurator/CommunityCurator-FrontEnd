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


export default function ShowPage () {

  const [alertError, setAlertError] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [groups, setGroups] = useState(null)
  const [loadGroups, setLoadGroups] = useState(false)

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
		fetch('http://127.0.0.1:8000/api/groups/')
		.then(response => {
			if(response.status > 400) {
			 setAlertError(true)
			 return;
			}
			return response.json();
		})
		.then(data => {
			const tempArray = []
			let counter = 0
			if(localStorage.getItem('location')) {
				for(let i = 0; i < data.groups.length; i++) {
					if(localStorage.getItem('location') === data.groups[i].city) {
						tempArray.push(data.groups[i])
						counter++
					}
	
					if(counter === 3) {
						setGroups(tempArray)
            setLoadGroups(false)
						return
					}
	
				}
			} else {
				for(let i = 0; i < 4; i++) {
					tempArray.push(data.groups[i])
				}
			}
			
      setGroups(tempArray)
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
                            <Grid item xs={7}>
										          <CategoryCard name={category.name} />
									          </Grid>
                          )
                        })) : ''}
                    </div>
                    
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={7}>
                  <div style={{height: '50px'}}></div>  
                    <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                      Recommended Groups in Your Area
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
                          debugger
                          return (
                            <Grid item xs={4}>
                              <Link to={"/groups/" + group.id}>
                              <RecommendGroupCard group={group}></RecommendGroupCard>
                              </Link>
                            </Grid>
                            )
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