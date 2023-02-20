import React, { useEffect, useState } from 'react'
import '../../App.css'
import './Home.css'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import { Button } from '../../components/Button/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import CategoryCard from '../../components/CategoryCard/CatgegoryCard'
import Grid from '@mui/material/Grid';


const Home = () => {

	const [open, setOpen] = useState(false)
	const [geoLocation, setGeoLocation] = useState(null)
	const [cityLoading, setCityLoading] = useState(false)
	const [alertError, setAlertError] = useState(false)
	const [categories, setCategories] = useState([])

	const showPosition = (position) => {
		fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
			.then(res => res.json())
			.then(result => {
				setGeoLocation(result[0].name)
				setCityLoading(false)
			});
	}

	useEffect(() => {
		/* get user's location */
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
			console.log(data)
		})
	},[])

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
			setCategories(data.categories)
		})
	},[])

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

			
			{geoLocation || cityLoading ? (
				<div className="home-container-city">
					Happening in  
						{cityLoading ? (
							<CircularProgress color="secondary" style={{marginLeft: '10px'}}/>
						)   : ' '} 
					
					<span className='home-container-city-name'>{geoLocation}</span>
				</div>
			): ''}

			{categories.length > 0 ? ( 
				<>
					<div className="home-container-category-title">
						<p>Popular interest categories in the area</p>
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
			): ''}

			{/* <Footer />  */}

			</div>
		</>
	 );
}

export default Home;