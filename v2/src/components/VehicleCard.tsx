import React, { useState, useEffect } from 'react';
import { CarouselCardProps } from '../Interfaces';

const totalDelay = (minutes: number) => {
  const hours = Math.floor(minutes / 60);

  return (hours > 0 ? (`${hours} hour${hours > 1 ? 's' : ''}`) : '') 
    + (minutes % 60 > 0 ? (hours === 0 ? (minutes % 60 === 1 ? `${minutes} minute` : `${minutes} minutes`) : `, ${minutes % 60} minutes`) : '');
}

export const VehicleCard = (props: CarouselCardProps) => {
  const [following, setFollowing] = useState(false);  

  return (
    <div className="vehicle-card">
      <div className="vehicle-card-header-container">
        <div className={`transit-icon-container ${props.type}`}>
          <img className="transit-icon" src={props.icon} alt="current vehicle icon" />
        </div>
        <h3 className="vehicle-card-header">
          <b>{!['via', 'gotrain'].includes(props.type) ? 'Route' : 'Train'} {props.route}</b>
        </h3>
        <div onClick={() => setFollowing(!following)} className="vehicle-card-button">
          <h4>
            <b>{following ? 'Following' : 'Follow'}</b>
          </h4>
        </div>
      </div>
      <hr className={`${props.type} ${props.dividerAnimation}`} />
      <div className="vehicle-card-section">
        <p>
          {props.direction}
        </p>
        <p>
          <b>{props.terminal}</b>
        </p>
      </div>
      <div className="vehicle-card-section">
        <p>
          Next Station
        </p>
        <p>
          <b>{props.nextStation}</b>
        </p>
      </div>
      {props.delay > 0 && (<div className="vehicle-card-section">
        <p>
          Delay
        </p>
        <p>
          <b>{totalDelay(props.delay)}</b>
        </p>
      </div>)}
    </div>
  );
};