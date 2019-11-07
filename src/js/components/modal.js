/* eslint-disable */
import React from 'react';
import Title from './title';

function addNewTask(props) {
  props.addNewTask(props);
  props.hideModal();
}

function changeView(props) {
  props.changeView('allTask');
  props.hideModal();
}

function Modal(props) {
	return (
		<div className="modal">
      <Title className="modal__title" title="Tarea creada"/>
      <button onClick={() => addNewTask(props)} className="modal__btn modal__btn--add">Crear otra</button>
      <button onClick={() => changeView(props)}className="modal__btn modal__btn--all">Ver tareas</button>
    </div>
	);
}

export default Modal;