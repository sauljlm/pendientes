/* eslint-disable */
import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import '../scss/style.scss';

function startRender() {
    ReactDOM.render(<App />,document.getElementById('root'));
}

window.onload = function() {
    startRender();
};