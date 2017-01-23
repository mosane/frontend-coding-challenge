import React from 'react';
import SearchBar from './SearchBar';
import EventList from './EventList';

class EventSide extends React.Component {
	constructor (props) {
		super(props);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleSortChange = this.handleSortChange.bind(this);
		this.state = {
			inputValue : '',
			sortedBy: 'start time'
		}
	}

	sortEvents (events) {
		const sortParam = this.state.sortedBy;
		return events.sort((a,b) => {
			if(a[sortParam] > b[sortParam]) return 1;
			else if (a[sortParam] < b[sortParam]) return -1;
			else return 0;
		})
	}

	handleFormChange (e) {
		const inputValue = e.target.value;
		this.setState({ inputValue });
	}

	handleSortChange (e) {
		const sortedBy = e.target.value;
		console.log(sortedBy)
		this.setState({ sortedBy });
	}

	render () {
		
		const searchParam = new RegExp (this.state.inputValue, "i");
		const filteredEvents = this.props.events.filter( event => event.title.match(searchParam))
		const sortedEvents = this.sortEvents(filteredEvents)
		return (<div className='col-xs-6 container eventside'>
			<h1>Events</h1>
			<SearchBar inputValue={ this.state.inputValue } handleChange = { this.handleFormChange }/>
			<button className = { this.state.sortedBy === 'start time' ? 'active btn btn-primary col-xs-5' : 'btn btn-primary col-xs-5'} value='start time' onClick = { this.handleSortChange }>Sort by Date</button>
			<button className = { this.state.sortedBy === 'title' ? 'active btn btn-primary col-xs-5 col-xs-offset-2' : 'btn btn-primary col-xs-5 col-xs-offset-2' } value='title' onClick = { this.handleSortChange }>Sort by Title</button>
			<EventList events={ filteredEvents } />
		</div>
		)
	}
}

export default EventSide;