import { toast } from 'react-toastify';
import { DEFAULT_TOAST_POSITION } from './constants';

export function showToast(toastValue) {
    toast(toastValue.message, {
        type: toastValue.type,
        position: DEFAULT_TOAST_POSITION,
        hideProgressBar: true,
        autoClose: 1000,
    });
}
