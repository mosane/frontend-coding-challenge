import React, { Component } from 'react';
import 'whatwg-fetch';
import token from './token';
import './App.css';
import './components/component.css';
import EventSide from './components/EventSide';
import FormSide from './components/FormSide';

class App extends Component {

  constructor () {
    super ();
    this.state = {
      events: []
    }

    this.addEvent = this.addEvent.bind(this);
  }

  componentDidMount () {
    this.getEvents(token)
    .then(res => res.json())
    .then(data => this.setState({
      events: data.results
    }))
    .catch(err => console.log(err))
  }
  getEvents (token) {
    return fetch('https://api.eventable.com/v1/events/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization' : `Token ${token}`
      }
    })
  }

  addEvent (newEvent) {
    const events = this.state.events.map( event => event);
    newEvent.id = 'local' + (events.length + 1);
    events.push(newEvent);
    this.setState({events})
  }
  render() {
    return (
      <div className="App col-xs-12">
        <EventSide events={ this.state.events }/>
        <FormSide addEvent = {this.addEvent}/>
      </div>
    );
  }

}


export default App;
