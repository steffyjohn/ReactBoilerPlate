export const loginFields = [
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'email',
        label: 'Email',
        valid: '["required","email"]',
        value: '',
    },
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'password',
        label: 'Password',
        valid: '["required"]',
        value: '',
        password: true,
    },
];

export const userFields = [
    {
        fieldType: 'input',
        inputType: 'text',
        label: 'First Name',
        name: 'first',
        valid: '["required"]',
        value: '',
        shrink: true,
        placeholder: 'John',
    },
    {
        fieldType: 'input',
        inputType: 'text',
        label: 'Last Name',
        name: 'last',
        valid: '["required"]',
        value: '',
        placeholder: 'Doe',
    },

    {
        fieldType: 'input',
        inputType: 'text',
        name: 'email',
        label: 'Email',
        valid: '["required","email"]',
        value: '',
        placeholder: 'johnDoe@gmail.com.com',
    },
    {
        fieldType: 'select',
        inputType: 'text',
        name: 'Role',
        label: 'Role',
        options: [
            {
                value: 'Admin',
                label: 'Admin',
            },
            {
                value: 'Manager',
                label: 'Manager',
            },
            {
                value: 'Executives',
                label: 'Executives',
            },
        ],
        default: 'label',
        value: '',
    },
];

export const passwordFields = [
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'password',
        label: 'Password',
        valid: '["required"]',
        value: '',
        password: true,
    },
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'confirmpassword',
        label: 'Confirm Password',
        valid: '["required","equalto"]',
        dataparam: 'password',
        value: '',
        password: true,
    },
];
