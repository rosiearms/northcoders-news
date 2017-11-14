import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bulma/css/bulma.css';

import App from './components/App';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
