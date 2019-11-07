/* eslint-disable */
import React from 'react';
import Title from './title';
import Paragraph from './paragraph';

function Empty(props) {
	return (
		<div className="empty">
      <Title className="empty__title" title="No hay tareas"/>
      <img className="empty__image" src={"../img/sinTareas.png"} alt="" />
      <Paragraph className="empty__messaje" text="Agrega una nueva tarea"/>
      <button onClick={() => props.addNewTask('newTask')} className="empty__btn">Crear tarea</button>
    </div>
	);
}

export default Empty;