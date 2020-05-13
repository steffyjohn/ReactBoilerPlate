import validator from 'validator';

const FormValidator = {
    validate(element) {
        const isCheckbox = element.type === 'checkbox';
        const value = isCheckbox ? element.checked : element.value;
        const name = element.name;

        if (!name) throw new Error('Input name must not be empty.');

        const param = element.getAttribute('dataparam');

        const validations = JSON.parse(element.getAttribute('dataValidate'));

        const result = [];
        if (validations && validations.length) {
            validations.forEach((m) => {
                switch (m) {
                    case 'required':
                        result[m] = isCheckbox ? value === false : validator.isEmpty(value);
                        break;
                    case 'email':
                        result[m] = !validator.isEmail(value);
                        break;
                    case 'number':
                        result[m] = !validator.isNumeric(value);
                        break;
                    case 'integer':
                        result[m] = !validator.isInt(value);
                        break;
                    case 'alphanum':
                        result[m] = !validator.isAlphanumeric(value);
                        break;
                    case 'url':
                        result[m] = !validator.isURL(value);
                        break;
                    case 'equalto':
                        const value2 = document.getElementById(param).value;
                        result[m] = !validator.equals(value, value2);
                        break;
                    default:
                        throw new Error('Unrecognized validator.');
                }
            });
        }

        return result;
    },
    bulkValidate(inputs) {
        let errors = {},
            hasError = false;

        inputs.forEach((input) => {
            const result = this.validate(input);
            errors = { ...errors, [input.name]: result };
            if (!hasError) hasError = Object.keys(result).some((val) => result[val]);
        });
        // console.log('error', {
        //     errors,
        //     hasError,
        // });
        return {
            errors,
            hasError,
        };
    },
};

export default FormValidator;
