import React from 'react';
import FormContainer from './Form/FormContainer';

class Random extends React.Component {
    state = {
        DataModel: [
            {
                fieldType: 'input',
                inputType: 'text',
                name: 'client_name',
                label: 'Name',
                valid: '["required","number"]',
                value: null,
            },
        ],
        formRegister2: {},
        view2: null,
    };
    formSubmit = (e) => {
        const form = e.target;
        const inputs = [...form.elements].filter((i) => ['INPUT', 'SELECT'].includes(i.nodeName));
        return inputs;
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        const inputs = this.formSubmit(e);

        this.setState({ view2: inputs });
    };
    OnCompleteForm2 = (value) => {
        console.log('value', value);
        this.setState({ view2: null });
    };
    render() {
        return (
            <form onSubmit={this.onSubmitForm} name="formRegister2">
                <FormContainer
                    fields={this.state.DataModel}
                    submit={this.state.view2}
                    cb={this.OnCompleteForm2}
                    cb2={() => this.setState({ view2: null })}
                    formRegister={this.state.formRegister2}
                />
                <button className="bg-croptix-color buttonPaddingChange" type="submit">
                    submit
                </button>
            </form>
        );
    }
}

export default Random;
