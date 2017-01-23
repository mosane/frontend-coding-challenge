import React from 'react';
import moment from 'moment';
import { FormGroup, FormControl, InputGroup, Button, Checkbox} from 'react-bootstrap';
class FormSide extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			start_time: '',
			end_time: '',
			title: '',
			description: '',
			warnings : [],
			allday: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
		this.handleDurationChange = this.handleDurationChange.bind(this);
		this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange;
		this.checkValidityAndShowWarnings = this.checkValidityAndShowWarnings.bind(this);
	}

	handleTitleChange (e) {
		const title = e.target.value;
		this.setState({ title });
	}

	handleDescriptionChange (e) {
		const description = e.target.value;
		this.setState ({ description })
	}

	handleStartTimeChange (e) {
		const start_time = e.target.value;
		this.setState({ start_time });
	}

	handleEndTimeChange (e) {
		const end_time = e.target.value;
		this.setState({ end_time })
	}

	handleDurationChange (e) {
		const allday = this.state.allday ? false:true;
		this.setState({ allday })
	}

	checkValidityAndShowWarnings() {
		const warnings = [];
		if(!this.state.title) warnings.push('The Event Must Have A Title.');
		if(!moment(this.state.start_time).isValid()) warnings.push('The Start Time is not valid.')
		if(!moment(this.state.end_time).isValid()) warnings.push('The End Time is not valid.')
		if(moment(this.state.start_time).valueOf()>=moment(this.state.end_time).valueOf()) warnings.push ('The event cannot end before it starts.');

		this.setState({ warnings })
		if(warnings.length) return false;
		else return true;
	}

	handleSubmit (e) {
		console.log('hitting handle submit', this.props)
		e.preventDefault();
		if(!this.checkValidityAndShowWarnings()) return;
		this.props.addEvent({
			start_time: moment(this.state.start_time).utc(), 
			end_time: moment(this.state.end_time).utc(),
			allday: this.state.allday,
			title: this.state.title,
			description: this.state.description,
		})
	}

	render () {
		const warnings = this.state.warnings;
		return (
		<div className = 'col-xs-6 dark-primary-color formside'>
		<div className = 'form-container'>
			<form className = 'form-vertical' onSubmit = { this.handleSubmit }>
				<legend>New Event</legend>
				{ warnings && warnings.map( err => <div className='alert alert-danger'>{err}</div>)}
				<FormGroup controlId='title'>
					<InputGroup>
						<InputGroup.Addon>Event Title</InputGroup.Addon>
						<FormControl value= { this.state.title } onChange={this.handleTitleChange} type='text' />
					</InputGroup>
				</FormGroup>
				<FormGroup controlId='startDate'>
					<InputGroup>
						<InputGroup.Addon>Start Time</InputGroup.Addon>
						<FormControl onChange={this.handleStartTimeChange} type='datetime-local' />
					</InputGroup>
				</FormGroup>
				<FormGroup controlId='endDate'>
					<InputGroup>
						<InputGroup.Addon>End Time</InputGroup.Addon>
						<FormControl onChange={this.handleEndTimeChange} type='datetime-local' />
					</InputGroup>
				</FormGroup>
				<FormGroup controlId='duration'>
					<InputGroup>
						<Checkbox onChange = {this.handleDurationChange}>All Day Event?</Checkbox>
					</InputGroup>
				</FormGroup>
				<FormGroup controlId='description'>
					<InputGroup>
						<InputGroup.Addon>Description</InputGroup.Addon>
						<FormControl value={this.state.description} onChange={this.handleDescriptionChange} componentClass='textarea' />
					</InputGroup>
				</FormGroup>
				<FormGroup controlId='submit'>
					<InputGroup>
						<Button type='submit' className='accent-color' bsSize='large'>Create Event</Button>
					</InputGroup>
				</FormGroup>
			</form>
		</div>
		</div>
			)
	}
}

export default FormSide;