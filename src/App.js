import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Grid, Card, Button, Container, } from 'semantic-ui-react'
import './styles/trajectory.css'
import 'semantic-ui-css/semantic.min.css'
import {Component} from 'react'
import ReactMapGL from 'react-map-gl'
import SideNav from './Components/SideNav'
import Map from './Components/Map'

const dataSchema = {
  vehicles: {
    subway: [
      {
        line: "1",
        position: [234, 324],
        speed: 69,
      },
    ],
    goTrain: [
      {
        line: '50',
        position: [234, 324],
        speed: 58,
        cars: 5,
      },
    ],
    streetCar: [
      {
        line: '506',
        position: [234, 324],
        speed: 70,
      },
    ],
  },
  controls: {
    activeVehicles: {
      subway: true,
      goTrain: true,
      streetCar: true,
    }
  }
}  

function App() {
  return (
    <Grid stretched style={{ padding: '1rem', border: 'black', height: '100vh' }}>
      <Grid.Row>
        <Grid.Column  width={16}>
          <SideNav />
        </Grid.Column>
      </Grid.Row>      
    </Grid>
  )
}

export default App
//? ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//? ░░░░░░░░░░░░░▄▄▄▄▄▄▄░░░░░░░░░
//? ░░░░░░░░░▄▀▀▀░░░░░░░▀▄░░░░░░░
//? ░░░░░░░▄▀░░░░░░░░░░░░▀▄░░░░░░
//? ░░░░░░▄▀░░░░░░░░░░▄▀▀▄▀▄░░░░░
//! ░░░░▄▀░░░░░░░░░░▄▀░░██▄▀▄░░░░
//! ░░░▄▀░░▄▀▀▀▄░░░░█░░░▀▀░█▀▄░░░
//! ░░░█░░█▄▄░░░█░░░▀▄░░░░░▐░█░░░
// ░░▐▌░░█▀▀░░▄▀░░░░░▀▄▄▄▄▀░░█░░
//? ░░▐▌░░█░░░▄▀░░░░░░░░░░░░░░█░░
//? ░░▐▌░░░▀▀▀░░░░░░░░░░░░░░░░▐▌░
//? ░░▐▌░░░░░░░░░░░░░░░▄░░░░░░▐▌░
//? ░░▐▌░░░░░░░░░▄░░░░░█░░░░░░▐▌░
//? ░░░█░░░░░░░░░▀█▄░░▄█░░░░░░▐▌░
//? ░░░▐▌░░░░░░░░░░▀▀▀▀░░░░░░░▐▌░
//? ░░░░█░░░░░░░░░░░░░░░░░░░░░█░░
//? ░░░░▐▌▀▄░░░░░░░░░░░░░░░░░▐▌░░
//? ░░░░░█░░▀░░░░░░░░░░░░░░░░▀░░░
//? ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░