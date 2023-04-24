import React, { useEffect, useState } from 'react'
import '../../App.css'
import './Home.css'
import Footer from '../../components/Footer/Footer'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CategoryCard from '../../components/CategoryCard/CatgegoryCard'
import GroupCard from '../../components/GroupCard/GroupCard'
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import Typography from '@mui/material/Typography';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';


const Home = () => {

	const { control, handleSubmit, watch, reset} = useForm({
    defaultValues: {
      emailValue: '',
      passwordValue: '',
    }
  });

  const watchEmail = watch('emailValue')
  const watchPassword = watch('passwordValue')

	const [loginModal, setLoginModal] = useState(false);
	const [open, setOpen] = useState(false)
	const [cityLoading, setCityLoading] = useState(false)
	const [alertError, setAlertError] = useState(false)
	const [categories, setCategories] = useState(null)
	const [groups, setGroups] = useState(null)
	const [pageLoading, setPageLoading] = useState(false);
	const navigate = useNavigate();
	const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

	const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: 'center',
    p: 4,
  };


	const showPosition = (position) => {
		fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
			.then(res => res.json())
			.then(result => {
				localStorage.setItem('location', result[0].name)
				localStorage.setItem('lat', position.coords.latitude)
				localStorage.setItem('lon', position.coords.longitude)
				// setGeoLocation(result[0].name)
				setCityLoading(false)
			});
	}

	useEffect(() => {
		/* get user's location */
		if(!localStorage.getItem('location')) {
			if (navigator.geolocation) {
				setCityLoading(true)
				navigator.permissions
				.query({ name: "geolocation" })
				.then(data => {
					if (data.state === 'granted') {
						navigator.geolocation.watchPosition(showPosition);
					} else if (data.state === 'prompt') {
						navigator.geolocation.watchPosition(showPosition);
					} else if (data.state === 'denied') {
						setCityLoading(false)
					}
					data.onchange = () => {
						if(data.state === 'denied') {
							setCityLoading(false)
						} else if (data.state === 'granted') {
							navigator.geolocation.watchPosition(showPosition);
						}
					 };
				})
	
			} 
		}
		
	},[]);


	useEffect(() => {
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
	
					if(counter === 4) {
						setGroups(tempArray)
						return
					}
	
				}
			} else {
				for(let i = 0; i < 4; i++) {
					tempArray.push(data.groups[i])
				}
			}
			
			if(!pageLoading) {
				setGroups(tempArray)
			}
		
		})
	},[cityLoading])

	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/categories/')
		.then(response => {
			if(response.status > 400) {
			 setAlertError(true)
			 return;
			}
			return response.json();
		})
		.then(data => {
			const tempArray = []
			for(let i = 0; i < 8; i++) {
				tempArray.push(data.categories[i])
			}
			setCategories(tempArray)
		})
	},[])

	useEffect(() => {
		if(categories && groups) {
			setPageLoading(false)
		} else {
			setPageLoading(true)
		}
	})

	const handleCreateGroup = () => {
		const userId = parseInt(localStorage.getItem('currentUser'))
		if(userId) {
			navigate(`/user/${userId}`)
		} else {
			setLoginModal(true)
		}
	}

	const onSubmit = (data) => {
    fetch(`http://127.0.0.1:8000/login/`, {
      method:"POST",
      headers: {
        "Content-type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        email: watchEmail,
        password: watchPassword
      })
    }).then(response => {
			if(response.status >= 400) {
			 setAlertError(true)
			 return;
			}
			return response.json();
		}).then(data => {
      if(data.user.id) {
        localStorage.setItem('currentUser', data.user.id)
        let url = `/user/${data.user.id}`
        setLoginModal(false)
        navigate(url)
        reset()
      }
    })
  }

	return (
		<>
			<Snackbar
				anchorOrigin={{'horizontal' : 'center', 'vertical' : 'top'}}
				open={alertError}
				autoHideDuration={5000}
				onClose={() => setAlertError(false)}
				// action={action}
			>
				<Stack sx={{ width: '100%' }} spacing={2}>
					<Alert svariant="filled" onClose={() => setAlertError(false)} severity="error">
						<AlertTitle>Error</AlertTitle>
						404 network fetch call error
					</Alert>
				</Stack>
			</Snackbar>
			<div className='home-container'>
				<div className='home-container-jumbo'>
					<video src='/video/meetup.mp4' autoPlay loop muted />
					<div className='home-container-jumbo-start'>
						<h1>Meet new people, Enjoy your community</h1>
						<div className="home-container-jumbo-start-btns">
						<Link to = '/groups'>
							<Button
									variant="contained"
								>
									Discover
							</Button>
						</Link>
				
							<Button
								variant="outlined"
								style={{color: 'white'}}
								onClick={handleCreateGroup}
							>
								Create a Group
							</Button>
						</div>
					</div>
				</div>

				<div className='home-container-slogan'>
					Do what you love, meet others who love it, find your community
				</div>

			
			{localStorage.getItem('location') || cityLoading ? (
				<div className="home-container-city">
					Happening in  
						{!localStorage.getItem('location') ? (
							<CircularProgress color="secondary" style={{marginLeft: '10px'}}/>
						)   : ' '} 
					
					<span className='home-container-city-name'>{localStorage.getItem('location')}</span>
				</div>
			): ''}

			{categories ? (
				<>
					<div className="home-container-category-title">
						{localStorage.getItem('location') ? (
							<p>Find groups based on interests like</p>
						): (<p>Interest categories</p>)}
						
					</div>

					<Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>
							{categories.map(category => {
								return (
									<Grid item xs={3}>
										<CategoryCard name={category.name} />
									</Grid>
								)
								})}
						</Grid>
				</>
			) : ''}

			{groups ? (
				<>
					<div className="home-container-category-title">
						{localStorage.getItem('location') ? (
								<p>Groups in {localStorage.getItem('location')}</p>
						): <p>Groups</p>}
						
					</div>

					<Grid style={{width: '80%', margin: '0px auto'}} container spacing={2}>
						{groups.map(group => {
							return (
								<Grid item xs={3}>
								  <Link to={"/groups/" + group.id}>
									<GroupCard group={group}></GroupCard>
								  </Link>
								</Grid>
							  )
						})}
					</Grid>
				</>
			): ''}

			</div>
			<Backdrop
      	sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      	open={pageLoading}
				style={{opacity: '.8', backgroundColor: 'black'}}			
      >	
			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '-70px'}}>
				<CircularProgress color="secondary" style={{width: '100px', height: '100px'}} />
				<p style={{fontSize: '2.3em', color: 'white', marginTop: '10px'}}>Loading</p>
			</div>
			</Backdrop>

			<Modal
          open={loginModal}
          onClose={() => setLoginModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Typography style={{marginBottom: '.8em'}} id="modal-modal-title" variant="h4" component="h1">
            Login
          </Typography>
          <hr></hr>
          <div style={{height: '3em'}}></div>
          <div className='login-fields'>
            <form noValidate>
              <Controller
                name="emailValue"
                control={control}
                render={({ 
                  field: { onChange, value },
                  fieldState: {error},
                }) => (
                  <TextField onChange={onChange} value={value} error={!!error} helperText={error ? error.message : null} required fullWidth id="filled-basic" label="Email" variant="filled" />
                )}
                rules={{
                  required: 'Email Required',
                   pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Must use a valid email',
                  },
                }}
              />
              <div style={{height: '2em'}}></div>
              <Controller
                name="passwordValue"
                control={control}
                render={({ field: { onChange, value}, fieldState: {error} }) => (
                  <TextField  error={!!error} helperText={error ? error.message : null} onChange={onChange} value={value} type="password" fullWidth id="filled-basic" label="Password" variant="filled" />
                )}
                rules={{
                  required: 'Password required'
                }}
              />
              <div style={{height: '2em'}}></div>
              <ColorButton 
                onClick={handleSubmit(onSubmit)} 
                type="submit"
                className='login-button' 
                size="large" 
                variant="contained"
              >
                Login
              </ColorButton>
                </form>
              </div>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Not a member? <span style={{color: '#0d6efd'}}><a href='/signup'>Signup</a></span>
            </Typography>
          </Box>
        </Modal>
		</>
	 );
}

export default Home;
