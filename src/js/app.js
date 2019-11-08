/* eslint-disable */
import React from 'react';
import Task from './components/task';
import Menu from './components/menu';
import Form from './components/form';
import Modal from './components/modal';
import Empty from './components/empty';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
    	url : 'https://pendientes-dani.herokuapp.com/',
			view : "allTask",
			modal: null,
			tasks: []
		}

		this.loadData();
	}

	newId() {
		return Math.floor(Math.random() * (1 - 1000 + 1) ) + 1;
	}

	async loadData() {
    const response = await fetch(this.state.url);
		const data = await response.json();
		await this.setState({
			tasks: data
		});
	}

	deleteToDb(Id) {
		fetch(`${this.state.url}/${Id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(() => this.loadData())
	}

	updateDb(Id, newValue) {
    fetch(`${this.state.url}/${Id}`, {
      method: 'PUT',
      body: JSON.stringify({ pending : newValue }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
		.then(() => this.loadData())
  }

  addToDb(data) {
    fetch(`${this.state.url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(() => this.loadData())
  }

	formatDate(date) {
		let currentDate;
		if(date) {
			currentDate = new Date(date).toLocaleDateString();
		} else {
			currentDate = new Date().toLocaleDateString();
		}
		return currentDate;
	}

	newTask(data) {
		const newObject = {
			title: data.title, 
			description: data.description, 
			matter: data.matter, 
			date: this.formatDate(data.date),
			pending: true
		}
		this.setState({
			tasks: [...this.state.tasks, newObject]
		});
		this.addToDb(newObject);
	}

	renderTask(data) {
		return (
			<Task 
				changeCompleted={this.changePending.bind(this)}
				deleteTask={this.deleteTask.bind(this)}
				key={`task${this.newId()}`}

				id={data.id}
				title={data.title} 
				description={data.description} 
				matter={data.matter}
				date={data.date}
				pending={data.pending}/>
		)
	}

	changePending(index) {
		const currentTasks = this.state.tasks;
		const id = currentTasks[index]._id;
		const newValue = !currentTasks[index].pending;
		this.updateDb(id, newValue);
	}

	deleteTask(index) {
		const currentTasks = this.state.tasks;
		const id = currentTasks[index]._id;
		currentTasks.splice(index, 1);
		this.setState({task: currentTasks});
		this.deleteToDb(id);
	}

	renderModal(emptyForm) {
		this.setState({
			modal: <Modal hideModal={this.hideModal.bind(this)} addNewTask={emptyForm()} changeView={this.changeView.bind(this)}/>
		});
	}

	hideModal() {
		this.setState({
			modal: null
		});
	}

	newEmpty() {
		return (
			<Empty key={`empty${this.newId()}`} addNewTask={this.changeView.bind(this)} />
		)
	}

	renderForm() {
		return (
			<Form 
				renderModal={this.renderModal.bind(this)}
				newTask={this.newTask.bind(this)}
				key={`form${this.newId()}`}
			/>
		)
	}

	renderAllTasks() {
		let tasks = [];
		this.state.tasks.map((task, index) => {
			const dataTask = {
				id:index,
				title: task.title, 
				description: task.description, 
				matter: task.matter, 
				date: task.date,
				pending: task.pending
			}
			tasks.push(this.renderTask(dataTask));
		});
		if (tasks.length === 0) {
			return this.newEmpty();
		} else {
			return (
				tasks
			)
		}
	}

	renderPendingTasks() {
		let tasks = [];
		this.state.tasks.map((task, index) => {
			if (task.pending === true) {
				const dataTask = {
					id:index,
					title: task.title, 
					description: task.description, 
					matter: task.matter, 
					date: task.date,
					pending: task.pending
				}
				tasks.push(this.renderTask(dataTask));
			}
		});
		if (tasks.length === 0) {
			return this.newEmpty();
		} else {
			return (
				tasks
			)
		}
	}

	renderCompletedTasks() {
		let tasks = [];
		this.state.tasks.map((task, index) => {
			if (task.pending === false) {
				const dataTask = {
					id:index,
					title: task.title, 
					description: task.description, 
					matter: task.matter, 
					date: task.date,
					pending: task.pending
				}
				tasks.push(this.renderTask(dataTask));
			}
		});
		if (tasks.length === 0) {
			return this.newEmpty();
		} else {
			return (
				tasks
			)
		}
	}

	changeView(view) {
		this.setState({
			view: `${view}`
		});
	}

	getActiveView() {
		let view = null;

		if (this.state.view === "newTask") {
			view = this.renderForm();
		} else if (this.state.view === "allTask") {
			view = this.renderAllTasks();
		}else if (this.state.view === "pendingTask") {
			view = this.renderPendingTasks();
		}else if (this.state.view === "completedTask") {
			view = this.renderCompletedTasks();
		}

		return view;
	}

	render() {
		const content = this.getActiveView();
		const modal = this.state.modal;

		return (
			<div className="container">
				<Menu 
					view={this.state.view} 
					changeView={this.changeView.bind(this)} 
					key={`menu${this.newId()}`}
				/>
				<div className="content">
					{content}
				</div>
				<div className={this.state.modal ? 'modal-container' : ''} >{modal}</div>
			</div>
		);
	}
}

export default App;
