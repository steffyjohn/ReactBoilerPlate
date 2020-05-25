import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes';
import { MuiThemeProvider } from '@material-ui/core/styles';
import useCommonTheme from './core/config/commonTheme';

function App(props: any) {
    const theme = useCommonTheme();
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}
export default App;
