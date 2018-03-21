import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const __PATH__ = (process.env.NODE_ENV === "development") ?
    "" : "/dnd-spell-cards-online";

ReactDOM.render((
    <BrowserRouter basename={__PATH__ + "/"}>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();