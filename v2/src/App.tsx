import React, { useState } from 'react';
import './App.css';
import { Scrollbars } from 'react-custom-scrollbars';
import clsx from 'clsx';
import { ActiveTransit, TransitIconImages, CarouselVehicle } from './Interfaces';
import logo from './assets/trajectory_logo.svg';
import buttonRight from './assets/button-right.svg';
import buttonLeft from './assets/button-left.svg';
import buttonDown from './assets/button-down.svg';
import GOTrainLight from './assets/gotrain-light.svg';
import VIALight from './assets/via-light.svg';
import StreetCarLight from './assets/streetcar-light.svg';
import SubwayLight from './assets/subway-light.svg';
import BusLight from './assets/bus-light.svg';
import searchLight from './assets/search-light.svg';
import { VehicleCard } from './components/VehicleCard';
import { Map } from "./components/Map";

const samepleVehicles: CarouselVehicle[] = [
  {
    type: 'bus',
    route: 505,
    direction: 'Westbound',
    terminal: `Queen's Park`,
    delay: 5,
    nextStation: 'Dundas'
  },
  {
    type: 'streetcar',
    route: 105,
    direction: 'Northbound',
    terminal: `Queen's Park`,
    delay: 10,
    nextStation: 'Dundas'
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
  const [displayUI, setDisplayUI] = useState(true);
  const [currVehicle, setCurrVehicle] = useState(0);
  
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
      <p className="transit-header">
        {title}
      </p>
    </div>
  );

  return (
    <div className="main-container">
      <div className="map">
        <Map/>
      </div>
      <div className="controls">
        <div className={clsx("side-menu-container", { "ui-hidden": !displayUI })}>
          <div className="side-menu-header-container">
            <h3 className="side-menu-header">
              Active transit
            </h3>
            <img 
              onClick={() => activateDropdown(!dropdown)} 
              className={clsx("arrow-button", { "dropdown-on": dropdown, "dropdown-off": !dropdown })} 
              src={buttonDown}
              alt="dropdown button" 
            />
          </div>
          <hr  className="side-menu-divider" />
          <div className={clsx("side-menu-active-transit", { "slide-in": !dropdown, "slide-out": dropdown })}>
            {Object.keys(activeTransit).map((transit: string) => transitIcon(transit))}
          </div>
          <div className={clsx("side-menu-options", { "hidden": !dropdown })}>
            {transitOption('Go Train', 'gotrain', GOTrainLight)}
            {transitOption('VIA', 'via', VIALight)}
            {transitOption('Street Car', 'streetcar', StreetCarLight)}
            {transitOption('Subway', 'subway', SubwayLight)}
            {transitOption('Bus', 'bus', BusLight)}
          </div>
        </div>
        <div className={clsx("search-container", { "ui-hidden": !displayUI })}>
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
            // <Scrollbars> @TODO can't get this to work atm
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
            // </Scrollbars>
          )}
        </div>
        <div className={clsx("vehicle-card-container", { "ui-hidden": !displayUI })}>
          <img 
            onClick={() => setCurrVehicle(currVehicle => (currVehicle === 0 ? samepleVehicles.length - 1 : --currVehicle))} 
            className="arrow-button"
            src={buttonLeft}
            alt="arrow left"
          />
            <VehicleCard
              type={samepleVehicles[currVehicle].type}
              route={samepleVehicles[currVehicle].route} 
              direction={samepleVehicles[currVehicle].direction}
              terminal={samepleVehicles[currVehicle].terminal}
              delay={samepleVehicles[currVehicle].delay}
              nextStation={samepleVehicles[currVehicle].nextStation}
              icon={transitImagesLight[samepleVehicles[currVehicle].type]}
            />
          <img 
            onClick={() => setCurrVehicle(currVehicle => (currVehicle === samepleVehicles.length - 1 ? 0 : ++currVehicle))} 
            className="arrow-button" 
            src={buttonRight} 
            alt="arrow right" 
          />
        </div>
      </div>
      <img alt="Trajectory logo" className="logo" src={logo} />
    </div>
  );
}

export default App;
