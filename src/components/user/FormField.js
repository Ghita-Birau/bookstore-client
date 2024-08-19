import React from 'react';

function FormField({ field, value, onValueChange }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onValueChange({ [name]: value });
    };

    return (
        <div className="form-group">
            <label htmlFor={field.key}>{field.label}</label>
            <input
                type={field.type}
                id={field.key}
                name={field.key}
                className="form-control"
                value={value}
                onChange={handleChange}
                required={field.required}
            />
        </div>
    );
}

export default FormField;
