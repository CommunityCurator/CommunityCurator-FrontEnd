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
import AddGroup from '../../components/AddGroup';

export default function ShowPage () {

  const [alertError, setAlertError] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

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

  function newGroup(name, city, state, description, category){
    const userId = parseInt(localStorage.getItem('currentUser'))
    const url = 'http://localhost:8000/api/groups/';
    const data = {group_name: name, city: city, state: state, description: description, category: category, users: userId};
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
                <>
                  <div className="welcome-header">
                  <Typography variant="h4" gutterBottom>
                    Welcome {userInfo.first_name} {userInfo.last_name}
                  </Typography>
                </div>
                <div style={{height: '3em'}}></div>
                <Grid style={{marginLeft: '2em'}} container spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="h5" gutterBottom>
                      Groups
                    </Typography>
                    <div style={{height: '1.5em'}}></div>
                    <TextField type="search" style={{width: '100%'}} label="Search Groups" id="outlined-basic" variant="outlined" />
                    <div style={{height: '1.5em'}}></div>
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
                            <MyGroupCard group={group}></MyGroupCard>
                          )
                        })) : ''}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                   
                  </Grid>
                </Grid>
                </>
              ): ''}
            </div>
        </>
    )
}