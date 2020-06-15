export const loginFields = [
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'email',
        label: 'Email',
        value: '',
    },
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'password',
        label: 'Password',
        value: '',
        type: 'password',
    },
];

export const userFields = [
    {
        fieldType: 'input',
        inputType: 'text',
        label: 'First Name',
        name: 'first',
        value: 'fghgh',
        shrink: true,
        placeholder: 'John',
    },
    {
        fieldType: 'input',
        inputType: 'text',
        label: 'Last Name',
        name: 'last',
        value: '',
        placeholder: 'Doe',
    },

    {
        fieldType: 'input',
        inputType: 'text',
        name: 'email',
        label: 'Email',
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
        default: 'value',
        value: 'Admin',
    },
];

export const passwordFields = [
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'password',
        label: 'Password',
        value: '',
        type: 'password',
    },
    {
        fieldType: 'input',
        inputType: 'text',
        name: 'confirmpassword',
        label: 'Confirm Password',
        value: '',
        type: 'password',
    },
];

export const TableData = {
    columns: [
        { title: 'Name', field: 'first' },
        { title: 'Surname', field: 'last' },
        { title: 'Email', field: 'email' },
        { title: 'Role', field: 'Role' },
    ],
    data: [
        { first: 'Steffy', last: 'John', Role: 'Manager', email: 'abc@gmail.com' },
        {
            first: 'Zerya Betül',
            last: 'Baran',
            Role: 'Executives',
            email: 'xyz@gmail.com',
        },
    ],
};
