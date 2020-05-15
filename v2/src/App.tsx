import React, { useState, useEffect } from 'react';
import './App.css';
import { Scrollbars } from 'react-custom-scrollbars';
import clsx from 'clsx';
import { ActiveTransit, TransitIconImages, CarouselVehicle } from './Interfaces';
import { VehicleCard } from './components/VehicleCard';
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
import roadAnimated from './assets/road-animated.svg';
import road from './assets/road.svg';
import wheel from './assets/wheel.svg';
import location from './assets/location.svg';
import locationAnimated from './assets/location-animated.svg';

const samepleVehicles: CarouselVehicle[] = [
  {
    type: 'bus',
    route: 505,
    direction: 'Westbound',
    terminal: `Queen's Park`,
    delay: 5,
    nextStation: 'Kensington'
  },
  {
    type: 'streetcar',
    route: 105,
    direction: 'Northbound',
    terminal: `Queen's Park`,
    delay: 10,
    nextStation: 'Dundas'
  },
  {
    type: 'via',
    route: 52,
    direction: 'Northbound',
    terminal: `Montreal`,
    delay: 45,
    nextStation: 'Ottawa'
  },
  {
    type: 'gotrain',
    route: 12,
    direction: 'Westbound',
    terminal: `Oshawa`,
    delay: 75,
    nextStation: 'Oshawa'
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
  const [currentVehicles, setCurrentVehiclces] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [followedVehicle, setFollowedVehicle] = useState<CarouselVehicle | {}>({});
  const [currVehicle, setCurrVehicle] = useState(0);
  const [activeCard, setActiveCard] = useState(false);
  const [settings, setSettings] = useState({
    vehicles: false,
    roads: false,
    location: false,
    ui: true
  });
  const [activeTransit, setActiveTransit] = useState<ActiveTransit>({
    gotrain: true,
    via: true,
    streetcar: false,
    subway: true,
    bus: false
  });
  
  useEffect(() => {
    setActiveCard(true);
    setTimeout(() => {
      setActiveCard(false);
    }, 300);
  }, [currVehicle])
  
  useEffect(() => {
    console.log(followedVehicle);
  }, [followedVehicle])

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
      </div>
      <div className="controls">
        <div className={clsx("side-menu-container", { "ui-hidden": !settings.ui })}>
          <div className="side-menu-header-container">
            <h3 className="side-menu-header">
              Active transit
            </h3>
            <img 
              onClick={() => activateDropdown(!dropdown)} 
              className={clsx("arrow-button right", { "dropdown-on": dropdown, "dropdown-off": !dropdown })} 
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
        <div className={clsx("search-container", { "ui-hidden": !settings.ui })}>
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
        <div className={clsx("vehicle-card-container", { "ui-hidden": !settings.ui, "slide-left-out": dropdown })}>
          <img 
            onClick={() => setCurrVehicle(currVehicle => (currVehicle === 0 ? samepleVehicles.length - 1 : --currVehicle))} 
            className="arrow-button left"
            src={buttonLeft}
            alt="arrow left"
          />
            <div className={"vehicle-card-body-container"}>
              <div className={"vehicle-card-body"}>
                <VehicleCard
                  type={samepleVehicles[currVehicle].type}
                  route={samepleVehicles[currVehicle].route} 
                  direction={samepleVehicles[currVehicle].direction}
                  terminal={samepleVehicles[currVehicle].terminal}
                  delay={samepleVehicles[currVehicle].delay}
                  nextStation={samepleVehicles[currVehicle].nextStation}
                  icon={transitImagesLight[samepleVehicles[currVehicle].type]}
                  dividerAnimation={clsx({ "slide-left-out": activeCard })}
                  followVehicle={setFollowedVehicle}
                />
              </div>
            </div>
          <img 
            onClick={() => setCurrVehicle(currVehicle => (currVehicle === samepleVehicles.length - 1 ? 0 : ++currVehicle))} 
            className="arrow-button right" 
            src={buttonRight} 
            alt="arrow right" 
          />
        </div>
        <div className="advanced-controls-container">
          <div 
            className={clsx("transit-icon-container advanced-controls-icon-container", { "active": settings.roads })}
            onClick={() => setSettings({ ...settings, roads: !settings.roads })}
          >
            <img 
              onMouseOver={(e) => e.currentTarget.src = roadAnimated} 
              onMouseOut={(e) => e.currentTarget.src = road}
              className="transit-icon" 
              src={road} alt="road icon" 
            />
          </div>
          <div 
            className={clsx("transit-icon-container advanced-controls-icon-container", { "active": settings.vehicles })}
            onClick={() => setSettings({ ...settings, vehicles: !settings.vehicles })}
          >
            <img  
              className="transit-icon"
              src={wheel} alt="wheel icon"
            />
          </div>
          <div
            className={clsx("transit-icon-container advanced-controls-icon-container", { "active": settings.location })}
            onClick={() => setSettings({ ...settings, location: !settings.location })}
          >
            <img
              onMouseOver={(e) => e.currentTarget.src = locationAnimated} 
              onMouseOut={(e) => e.currentTarget.src = location}
              className="transit-icon"
              src={location} alt="location icon" 
            />
          </div>
        </div>
      </div>
      <img alt="Trajectory logo" className="logo" src={logo} />
    </div>
  );
}

export default App;
