import React, { Component } from 'react';
import Joi from 'joi';
import Input from './input';

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        const options = { abortEarly: false };
        const schema = Joi.object(this.schema);
        const { error } = schema.validate(this.state.data, options);
        if (!error) return null;

        const errors = {};
        error.details.forEach(item => {
            errors[item.path[0]] = item.message;
        });
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = Joi.object({ [name]: this.schema[name] });
        const { error } = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    };

    renderButton(label) {
        return (
            <button
                disabled={this.validate()}
                className='btn btn-primary'
                onSubmit={this.handleSubmit}
            >
                {label}
            </button>
        );
    }

    renderInput(name, label, type = 'text') {
        const { data, errors } = this.state;

        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    }
}

export default Form;
