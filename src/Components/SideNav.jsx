import React, { Component } from 'react'
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import Map from './Map';

export default class SideNav extends Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
	handleActive() {
		
	}

  render() {
    const { visible } = this.state

    return (
      <div>
        <Button.Group>
          <Button icon disabled={visible} onClick={this.handleShowClick}>
						<Icon name="chevron right" />
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
						width='large'
						style={{ padding: '1rem', backgroundColor: 'white' }}
          >
            <Header style={{
							fontFamily: 'Major Mono Display',
							textAlign: 'left',
							color: 'black',
							fontSize: '32px',
							padding: '1rem'
						}}>
							Active Transit
            </Header>
            <Menu.Item onClick={this.handleActivate} as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher>
            <Map />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
