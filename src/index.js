import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { toppings, operator } from './config';

ReactDOM.render(<App toppings={toppings} operator={operator} />, document.getElementById('root'));
registerServiceWorker();
