/* eslint-disable */
/* eslint-disable */
import React from 'react';
import Title from './title';
import Paragraph from './paragraph';

function Task(props) {
	return (
		<div className="task">
			<div className={props.pending === true ? 'task__header' : 'task__header task__header--done'}>
				<Title className="task__title" title={props.title}/>
			</div>
			<div className="task__content">
				<div className="task__desc-container">
					<span>Descripcion: </span>
					<Paragraph className="task__description" text={props.description}/>
				</div>
				<div className="task__container-matter">
					<span>Materia: </span>
					<Paragraph className="task__matter" text={props.matter}/>
				</div>
				<div className="task__container-fecha">
					<span>Fecha: </span>
					<Paragraph className="task__fecha" text={props.date}/>
				</div>
				<div className="task__btn-container">
					<button onClick={() =>props.changeCompleted(props.id)} className="task__btn-complete"></button>
					<button onClick={() =>props.deleteTask(props.id)} className="task__btn-delete"></button>
				</div>
			</div>
		</div>
	);
}

export default Task;