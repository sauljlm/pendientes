/* eslint-disable */
import React from 'react';

class Form extends React.Component  {
	constructor(props) {
    super(props);
    this.state = {
			title: null,
			description: null,
			matter: null,
			date: null,
		};

    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value
    })
	}

	emptyForm() {
		this.setState({title: ""});
		this.setState({description: ""});
		this.setState({matter: ""});
		this.setState({date: ""});
	}

  handleSubmit(event) {
		event.preventDefault();

		this.props.newTask({
			title: this.state.title, 
			description: this.state.description, 
			matter: this.state.matter, 
			date: this.state.date
		});
		this.props.renderModal(() => this.emptyForm.bind(this));
  }

  render() {
    return (
			<div className="form">
				<form onSubmit={this.handleSubmit}>
					<div className="form__item">
						<label>Titulo:</label>
						<input type="text" value={this.state.title} name="title" onChange={this.handleChange} required/>
					</div>
					<div className="form__item">
						<label>Materia:</label>
						<input type="text" value={this.state.matter} name="matter" onChange={this.handleChange} required/>
					</div>
					<div className="form__item">
						<label>Fecha:</label>
						<input type="date" value={this.state.date} name="date"  onChange={this.handleChange}/>
					</div>
					<div className="form__item">
						<label>Descripcion:</label>
						<textarea value={this.state.description} name="description" onChange={this.handleChange} required/>
					</div>
					<div className="form__item form__btn-container">
						<input type="submit" value="Guardar" className="form__send"/>
						<input type="reset" value="Borrar" className="form__reset"/>
					</div>
				</form>
			</div>
    );
  }
}

export default Form;