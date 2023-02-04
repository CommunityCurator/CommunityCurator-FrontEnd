/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/

import React from 'react'
import './Button.css'
import {Link} from 'react-router-dom'

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'ntn--large'];

export const Button = ({children, type, onCLick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return(
        <Link to = '/login' className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onCLick}
                type={type}
            >
                {children}
            </button>
        </Link>
    )
};