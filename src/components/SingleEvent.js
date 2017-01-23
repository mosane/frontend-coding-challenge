import React from 'react';
import moment from 'moment';
const SingleEvent = (props) => {
	const startTime = moment(props.event.start_time);
	const endTime = moment(props.event.end_time);
	const title = props.event.title;
	const description = props.event.description || "This is a secret event with no description";
	const relative =startTime.fromNow();
	let duration =endTime.diff(startTime, 'hours') + ' hours';
	return (
		<li className = 'single-event divider-color col-xs-12'> 
		    <div className="date">
            <time dateTime={startTime}>
              <span className="day">{startTime.get('date')}</span>
              <span className="month">{startTime.get('month') + 1}</span>
              <span className="year">{startTime.get('year')}</span>
            </time>
            </div>
            <div className="info">
              <h2 className="col-xs-12 title">{title}</h2>
              <br></br>
              <div className ='row'>
              <h3 className='col-xs-4'>Duration: { duration}</h3>
              <h3 className='col-xs-4'>End Time: { endTime.utc().format() }</h3>
              <h3 className='col-xs-4'>Starts: { relative }</h3>
              </div>
              <p className="col-xs12 desc">{description}</p>
            </div>
		</li>
	)
}

export default SingleEvent;