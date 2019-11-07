/* eslint-disable */
import React from 'react';

class Menu extends React.Component  {
	constructor(props) {
		super(props);

		this.state = {
			btnMenu: false,
			menuActive: false,
			listProperty: [
				{
					view: "newTask",
					name:  "Crear nueva tarea"
				},
				{
					view: "allTask",
					name:  "Todas las tareas"
				},
				{
					view: "pendingTask",
					name:  "Tareas pendientes"
				},
				{
					view: "completedTask",
					name:  "Tareas completas"
				}
			]
		}
	}

	changeView(view) {
		this.props.changeView(view);
		this.hambAction();
	}

	hambAction() {
		this.setState({
			btnMenu: !this.state.btnMenu
		})
		this.setState({
			menuActive: !this.state.menuActive
		})
	}

	render() {
		return (
			<div className="header-container">
				<div className="hamburguer">
					<svg className={this.state.btnMenu ? "hamburguer__btn hamburguer__btn--active" : "hamburguer__btn"} onClick={this.hambAction.bind(this)} viewBox="0 0 30 30">
						<path className="line line-top" d="M0,9h30"/>
						<path className="line line-center" d="M0,15h30"/>
						<path className="line line-bottom" d="M0,21h30"/>
					</svg>
				</div>
				<div className="header">
					<h2 className="header__title">{this.props.view}</h2>
				</div>
				
        <nav className={this.state.menuActive ? "menu menu--show" : "menu"}>
					<ul className="menu__container">
						{this.state.listProperty.map(item => {
							return(
								<li>
									<button
										onClick={() => this.changeView(item.view)} 
										className={this.props.view === (item.view) ? 'menu__link menu__link--active' : 'menu__link'} >
										{item.name}
									</button>
								</li>
							)
						})}
					</ul>
				</nav>
      </div>
		)
	}
}

export default Menu;