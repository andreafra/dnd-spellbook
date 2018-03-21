import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const __PATH__ = (window.location.hostname === "andreafranchini.me") ?
    "/dnd-spell-cards-online" : "";

ReactDOM.render((
    <BrowserRouter basename={__PATH__ + "/"}>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();