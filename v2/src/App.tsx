import React, { useState } from 'react';
import './App.css';
import logo from './assets/trajectory_logo.svg';
import buttonDown from './assets/button-down.svg';
import buttonUp from './assets/button-up.svg';
import GOTrainLight from './assets/gotrain-light.svg';
import VIALight from './assets/via-light.svg';
import StreetCarLight from './assets/streetcar-light.svg';
import SubwayLight from './assets/subway-light.svg';
import BusLight from './assets/bus-light.svg';
import searchLight from './assets/search-light.svg';

const transitImagesLight: any = {
  gotrain: GOTrainLight,
  via: VIALight,
  streetcar: StreetCarLight,
  subway: SubwayLight,
  bus: BusLight
}

const App = () => {
  const [dropdown, activateDropdown] = useState(false);
  const [activeTransit, setActiveTransit]: any = useState({
    gotrain: true,
    via: true,
    streetcar: false,
    subway: true,
    bus: false
  });
  
  const transitIcon = (transitType: string) => (
    <div key={transitType} onClick={() => setActiveTransit({...activeTransit, [`${transitType}`]: !activeTransit[transitType]})} className={`transit-icon-container ${transitType} ${!activeTransit[transitType] && 'inactive'}`}>
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
            <img onClick={() => activateDropdown(!dropdown)} className="side-menu-button" src={dropdown ? buttonUp : buttonDown} alt="dropdown button" />
          </div>
          <hr  className="side-menu-divider" />
          <div className={`side-menu-active-transit ${!dropdown ? 'slide-in' : 'slide-out'}`}>
            {Object.keys(activeTransit).map((transit: string) => (
              activeTransit[transit] && (
                transitIcon(transit.toLowerCase())
              )
            ))}
          </div>
          <div className={`side-menu-options ${!dropdown ? 'hidden' : ''}`}>
            {transitOption('Go Train', 'gotrain', GOTrainLight)}
            {transitOption('VIA', 'via', VIALight)}
            {transitOption('Street Car', 'streetcar', StreetCarLight)}
            {transitOption('Subway', 'subway', SubwayLight)}
            {transitOption('Bus', 'bus', BusLight)}
          </div>
        </div>
        <div className="search-icon-container">
          <img className="transit-icon" src={searchLight} alt="search icon" />
        </div>
        <img alt="Trajectory logo" className="logo" src={logo} />
      </div>
    </div>
  );
}

export default App;
