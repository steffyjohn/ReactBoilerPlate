import { teal } from '@material-ui/core/colors';

export const getTheme = (theme) => {
    switch (theme) {
        case 'light':
            return {
                primary: '#23b7e5',
                secondary: '#ffffff',
            };
        case 'dark':
            return {
                primary: teal[400],
                secondary: '#3a3f51',
            };
        default:
            return {
                primary: teal[400],
                secondary: '#3a3f51',
            };
    }
};
