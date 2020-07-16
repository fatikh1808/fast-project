import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";

import App from './App';
import './index.css';

import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </div>,
    document.getElementById('root')
);
