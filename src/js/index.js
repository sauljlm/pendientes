/* eslint-disable */
import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import '../img/logo.png';
import '../img/done.png';
import '../img/delete.png';
import '../img/sinTareas.png';

import '../scss/style.scss';
import './registerServiceWorker';

function startRender() {
    ReactDOM.render(<App />,document.getElementById('root'));
}

window.onload = function() {
    startRender();
};
