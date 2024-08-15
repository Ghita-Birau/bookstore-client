import React from 'react';

function RegisterFormField({ field, value, onChange }) {
    return (
        <div className="form-group">
            <label htmlFor={field.key}>{field.label}</label>
            <input
                type={field.type}
                id={field.key}
                name={field.key}
                className="form-control"
                value={value}
                onChange={onChange}
                required={field.required}
            />
        </div>
    );
}

export default RegisterFormField;
