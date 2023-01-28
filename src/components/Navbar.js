/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://www.youtube.com/watch?v=I2UBjN5ER4s
*                  https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/

import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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

  window.addEventListener('resize', showButton);

  return (
    <>
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
                <li>
                    <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                        Sign in
                    </Link>
                </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>Sign in</Button>}
        </div>
     </nav>

    </>
  )
}

export default Navbar;
