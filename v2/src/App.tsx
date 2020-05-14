import React, { useState } from 'react';
import './App.css';
import clsx from 'clsx';
import { ActiveTransit, TransitIconImages, CarouselVehicle } from './Interfaces';
import logo from './assets/trajectory_logo.svg';
import buttonDown from './assets/button-down.svg';
import GOTrainLight from './assets/gotrain-light.svg';
import VIALight from './assets/via-light.svg';
import StreetCarLight from './assets/streetcar-light.svg';
import SubwayLight from './assets/subway-light.svg';
import BusLight from './assets/bus-light.svg';
import searchLight from './assets/search-light.svg';

const samepleVehicles: CarouselVehicle[] = [
  {
    type: 'bus',
    route: 505,
    direction: 'Westbound',
    terminal: `Queen's Park`,
    delay: 5
  },
  {
    type: 'streetcar',
    route: 105,
    direction: 'Northbound',
    terminal: `Queen's Park`,
    delay: 10
  },
]

const transitImagesLight: TransitIconImages = {
  gotrain: GOTrainLight,
  via: VIALight,
  streetcar: StreetCarLight,
  subway: SubwayLight,
  bus: BusLight
}

const App = () => {
  const [dropdown, activateDropdown] = useState(false);
  const [search, activateSearch] = useState(false);
  const [activeTransit, setActiveTransit] = useState<ActiveTransit>({
    gotrain: true,
    via: true,
    streetcar: false,
    subway: true,
    bus: false
  });
  const [currentVehicles, setCurrentVehiclces] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  const transitIcon = (transitType: string) => (
    <div 
      key={transitType} 
      onClick={() => setActiveTransit({ ...activeTransit, [`${transitType}`]: !activeTransit[transitType] })} 
      className={`transit-icon-container ${transitType} ${!activeTransit[transitType] && 'inactive'}`}
    >
      <img className="transit-icon" src={transitImagesLight[transitType]} alt={`${transitType} icon`} />
    </div>
  );
  
  const transitOption = (title: string, transitType: string, icon: string) => (
    <div className="transit-box"> 
      {transitIcon(transitType)}
      <h3 className="transit-header">
        {title}
      </h3>
    </div>
  );

  return (
    <div className="main-container">
      <div className="map">
      </div>
      <div className="controls">
        <div className="side-menu-container">
          <div className="side-menu-header-container">
            <h2 className="side-menu-header">
              Active transit
            </h2>
            <img 
              onClick={() => activateDropdown(!dropdown)} 
              className={clsx("side-menu-button", { "dropdown-on": dropdown, "dropdown-off": !dropdown })} 
              src={buttonDown}
              alt="dropdown button" 
            />
          </div>
          <hr  className="side-menu-divider" />
          <div className={clsx("side-menu-active-transit", { "slide-in": !dropdown, "slide-out": dropdown })}>
            {Object.keys(activeTransit).map((transit: string) => (
              activeTransit[transit] && (
                transitIcon(transit)
              )
            ))}
          </div>
          <div className={clsx("side-menu-options", { "hidden": !dropdown })}>
            {transitOption('Go Train', 'gotrain', GOTrainLight)}
            {transitOption('VIA', 'via', VIALight)}
            {transitOption('Street Car', 'streetcar', StreetCarLight)}
            {transitOption('Subway', 'subway', SubwayLight)}
            {transitOption('Bus', 'bus', BusLight)}
          </div>
        </div>
        <div className="search-container">
          <div className="search-controls-container">
            <input 
              autoFocus={search}
              onFocus={(e) => e.target.select()}
              disabled={!search} 
              className={clsx("search-box", { "search-box-on": search, "search-box-off": !search })} 
              type="text" placeholder="501 Queens" 
            />
            <div className="search-icon-container" onClick={() => activateSearch(!search)}>
              <img className="transit-icon" src={searchLight} alt="search icon" />
            </div>
          </div>
          {search && (
            <div className="search-suggestions-container">
              <p className="search-suggestion">
                This is a sample and it is very long very very long
              </p>
              <p className="search-suggestion">
                This is a sample and it is very long very very long
              </p>
              <p className="search-suggestion">
                This is a sample and it is very long very very long
              </p>
              <p className="search-suggestion">
                This is a sample and it is very long very very long
              </p>
              <p className="search-suggestion">
                This is a sample and it is very long very very long
              </p>
            </div>
          )}
        </div>
        <div className="vehicle-cards-container">
          
        </div>
        <img alt="Trajectory logo" className="logo" src={logo} />
      </div>
    </div>
  );
}

export default App;
