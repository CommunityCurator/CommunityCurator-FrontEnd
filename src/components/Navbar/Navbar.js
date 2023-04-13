/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://www.youtube.com/watch?v=I2UBjN5ER4s
*                  https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/

import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


import './Navbar.css';

function Navbar() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      emailValue: '',
      passwordValue: '',
    }
  });

  const watchEmail = watch('emailValue')
  const watchPassword = watch('passwordValue')

  /* State */
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [loginModal, setLoginModal] = useState(false);
  const [alertError, setAlertError] = useState(false)
  const [isUser, setIsUser] = useState(null)
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() =>{
    showButton();
  }, []);

  useEffect(() => {
    setIsUser(localStorage.getItem('currentUser'))
  })

  window.addEventListener('resize', showButton);

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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const handleLogin = () => {
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
      }
    })
  }

  const handleLogOut = () => {
    localStorage.clear()
    setIsUser(null)
    navigate('/')
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
              Invalid Email and Password Combination
					</Alert>
				</Stack>
			</Snackbar>
     <nav className='navbar'>
        <div className='navbar-container'>
            <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
                CommunityCurator  <i className='fas fa-solid fa-users' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active ' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                {isUser ? (
                  <li className='nav-item'>
                    <Link to={`/user/${parseInt(localStorage.getItem('currentUser'))}`} className='nav-links' onClick={closeMobileMenu}>
                        Profile
                    </Link>
                  </li>
                ): ''}
                <li className='nav-item'>
                    <Link to='/groups' className='nav-links' onClick={closeMobileMenu}>
                        Groups
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/events' className='nav-links' onClick={closeMobileMenu}>
                        Events
                    </Link>
                </li>
                {/* <li>
                    <div className='nav-links-mobile' onClick={() => setLoginModal(true)}>
                        Log in
                    </div>
                </li> */}
            </ul>

            {isUser ? (
              <Button 
                className='nav-links-mobile' 
                style={{color: 'white', fontFamily: 'PT Sans', fontSize: '1.1rem', border: '1px solid white'}} 
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            ): (
              <Button 
                className='nav-links-mobile' 
                style={{color: 'white', fontFamily: 'PT Sans', fontSize: '1.1rem', border: '1px solid white'}} 
                onClick={() => setLoginModal(true)} variant="outlined">
                Login
              </Button>
            )}
            
            {/* {button && <Button nClick={() => setLoginModal(true)} buttonStyle='btn--outline'>Log in</Button>} */}
        </div>
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
            <form>
              <Controller
                name="emailValue"
                control={control}
                render={({ field: { onChange, value} }) => (
                  <TextField onChange={onChange} value={value} required fullWidth id="filled-basic" label="Email" variant="filled" />
                )}
              />
              <div style={{height: '2em'}}></div>
              <Controller
                name="passwordValue"
                control={control}
                render={({ field: { onChange, value} }) => (
                  <TextField onChange={onChange} value={value} type="password" required fullWidth id="filled-basic" label="Password" variant="filled" />
                )}
              />
            </form>
          </div>
          <div style={{height: '2em'}}></div>
          <ColorButton 
            onClick={handleLogin} 
            className='login-button' 
            size="large" 
            variant="contained"
          >
            Login
          </ColorButton>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Not a member? <span style={{color: '#0d6efd'}}><a href='/signup'>Signup</a></span>
          </Typography>
        </Box>
        </Modal>
     </nav>

    </>
  )
}

export default Navbar;
