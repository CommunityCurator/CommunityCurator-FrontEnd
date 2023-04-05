import React, { useEffect, useState } from 'react'
import '../../App.css'
import './Home.css'
import Footer from '../../components/Footer/Footer'
import { Button } from '../../components/Button/Button'
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


const Home = () => {

	const [open, setOpen] = useState(false)
	const [cityLoading, setCityLoading] = useState(false)
	const [alertError, setAlertError] = useState(false)
	const [categories, setCategories] = useState(null)
	const [groups, setGroups] = useState(null)
	const [pageLoading, setPageLoading] = useState(false);


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
	},[groups])

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
	},[categories])

	useEffect(() => {
		if(categories && groups) {
			setPageLoading(false)
		} else {
			setPageLoading(true)
		}
	})

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
							<Button
								className='btns'
								buttonStyle='btn--outline'
								buttonSize='btn--large'
							>
								Discover
							</Button>
							<Button
								className='btns'
								buttonStyle='btn--outline'
								buttonSize='btn--large'
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
							<p>Interest categories in the area</p>
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
		</>
	 );
}

export default Home;
