/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://www.youtube.com/watch?v=I2UBjN5ER4s
*                  https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/

import React from 'react'
import { Button } from './Button/Button'
import '../App.css'
import "./Section.css"

function Section(){

    return(
        <div className='section-container'>
            <video src='/video/meetup.mp4' autoPlay loop muted />
            <h1>Find Your Community</h1>
            <div className="section-btns">
                <Button className='btns' 
                buttonStyle='btn--outline'
                buttonSize='btn--large'
                >
                    Join now
                </Button>
                
            </div>
        </div>
    )
}

export default Section;