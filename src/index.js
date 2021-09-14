import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {Link_app} from './App'
 




ReactDOM.render(
    <Provider store={store}>
      <Link_app />
    </Provider>
  ,
  document.getElementById('root')
);



