import React from 'react';
import { CarouselCardProps } from '../Interfaces';

const totalDelay = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  let finalTime = '';

  finalTime += hours > 0 ? (`${hours} hour${hours > 1 ? 's' : ''}`) : ''
  finalTime += hours === 0 ? `${minutes} minutes` : `, ${minutes % 60} minutes`

  return finalTime;
}

export const VehicleCard = (props: CarouselCardProps) => (
  <div className="vehicle-card">
    <div className="vehicle-card-header-container">
      <div className={`transit-icon-container ${props.type}`}>
        <img className="transit-icon" src={props.icon} alt="current vehicle icon" />
      </div>
      <h3 className="vehicle-card-header">
        <b>Route {props.route}</b>
      </h3>
    </div>
    <hr className="side-menu-divider" />
    <p>
      {props.direction} -> <b>{props.terminal}</b>
    </p>
    <p>
      Next Station -> <b>{props.nextStation}</b> 
    </p>
    {props.delay > 0 && (
      <p>
        Delay -> <b>{totalDelay(props.delay)}</b> 
      </p>
    )}
  </div>
);