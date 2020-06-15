import * as Yup from 'yup';

export const validate = (element) => {
    const result: any = [];
    const validations = Object.keys(element);
    if (validations && validations.length) {
        validations.forEach((m) => {
            switch (m) {
                case 'email':
                    result[m] = Yup.string().email().required('Email is Required');
                    break;
                case 'password':
                    result[m] = Yup.string()
                        .required('Password is Required')
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.');
                    break;
                case 'confirmpassword':
                    result[m] = Yup.string()
                        .required('Confirm your password')
                        .oneOf([Yup.ref('password')], 'Password does not match');
                    break;
                case 'first':
                    result[m] = Yup.string().required('First Name is Required');
                    break;
                case 'last':
                    result[m] = Yup.string().required('Last Name is Required');
                    break;
                case 'Role':
                    result[m] = Yup.string().required('Role is Required');
                    break;

                default:
                    throw new Error('Unrecognized validator.');
            }
        });
    }

    return Yup.object().shape(result);
};
