import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes';

function App(props: any) {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}
export default App;
