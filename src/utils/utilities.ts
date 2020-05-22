import { teal, lightBlue, blueGrey, common } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import { DEFAULT_TOAST_POSITION } from '../core/config/constants';

export const getTheme = (theme) => {
    switch (theme) {
        case 'light':
            return {
                primary: lightBlue[500],
                secondary: common.white,
            };
        case 'dark':
            return {
                primary: teal[400],
                secondary: blueGrey[900],
            };
        default:
            return {
                primary: teal[400],
                secondary: blueGrey[900],
            };
    }
};

export function showToast(toastValue) {
    toast(toastValue.message, {
        type: toastValue.type,
        position: DEFAULT_TOAST_POSITION,
        hideProgressBar: true,
        autoClose: 500,
        onClose: () => {
            if (toastValue.cb) {
                toastValue.oncloseToast();
            }
        },
    });
}
