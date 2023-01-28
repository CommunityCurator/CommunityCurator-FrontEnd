/***************************************************************************************
*    Title: React Website Tutorial
*    Author: Brian Design
*    Date: 08/10/2020
*    Availability: https://github.com/briancodex/react-website-v1/tree/starter
***************************************************************************************/

import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Explore local groups and events</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src="/images/paint.jpg"
              text='Explore groups'
              label='hobby'
              path='/groups'
            />
            <CardItem
              src="/images/event.jpg"
              text='Explore events'
              label='events'
              path='/events'
            />
            <CardItem
              src="/images/gaming.jpg"
              text='Join Community Curator'
              label='Register'
              path='/sign-in'
            />
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;