import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SqHeader } from './components/header/Header';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div>
    <SqHeader></SqHeader>
  </div>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
