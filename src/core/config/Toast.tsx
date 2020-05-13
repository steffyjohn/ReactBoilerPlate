import { toast } from 'react-toastify';
import { DEFAULT_TOAST_POSITION } from './constants';

export function showToast(toastValue) {
    toast(toastValue.message, {
        type: toastValue.type,
        position: DEFAULT_TOAST_POSITION,
        hideProgressBar: true,
        autoClose: 500,
        onClose: () => {
            if (toastValue.cb) {
                console.log('999');
                toastValue.oncloseToast();
            }
            // return  toastValue.cb?toastValue.oncloseToast():null
        },
    });
}
