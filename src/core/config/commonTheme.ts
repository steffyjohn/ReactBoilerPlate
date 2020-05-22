import { useSelector } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { DefaultStore } from '../Interface/store.interface';

function CommonTheme() {
    const { layout } = useSelector((state: DefaultStore) => state.settings);
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: layout.primary,
            },
            secondary: {
                main: layout.secondary,
            },
        },
        typography: {
            fontFamily: [
                'Heebo',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    });
    return theme;
}
export default CommonTheme;
