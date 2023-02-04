import React, { useEffect, useState } from 'react'
import '../../App.css'
import './Home.css'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import { Button } from '../../components/Button/Button'
import CircularProgress from '@mui/material/CircularProgress';


const Home = () => {

	const [open, setOpen] = useState(false)
	const [geoLocation, setGeoLocation] = useState(null)
  const [cityLoading, setCityLoading] = useState(false)

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

  return (
		<>
		  <div className='home-container'>
        <video src='/video/meetup.mp4' autoPlay loop muted />
        <div className='home-jumbo'>
          <h1>Meet new people, Enjoy your community</h1>
      <div className="home-section-btns">
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
			<div className='home-slogan'>
					Do what you love, meet others who love it, find your community
			</div>

      
        {geoLocation || cityLoading ? (
          <div className="home-city-container">
            Happening in  
              {cityLoading ? (
                <CircularProgress color="secondary" style={{marginLeft: '10px'}}/>
              )   : ' '} 
            
            <span className='home-city-name'>{geoLocation}</span>
          </div>
        ): ''}
			{/* <Cards />
			<Footer /> */}
		</>
   );
}

export default Home;
