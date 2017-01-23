import SingleEvent from './SingleEvent';
import React from 'react';

const EventList = (props) => {

	return (
		<ul className = 'col-xs-12 event-list'>
		{
			props.events.map (event => {
				return <SingleEvent key = { event.id } event = { event } /> 
			})
		}
		</ul>
	)
}

export default EventList;