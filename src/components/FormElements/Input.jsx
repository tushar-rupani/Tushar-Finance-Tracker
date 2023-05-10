import React from 'react'

export const Input = ({ name, type, register, error, label }) => {
    return (
        <div>
            <br />
            <label>{label} </label>
            <input
                {...register(name)}
                type={type}
                name={name}
            />
            <div style={{ color: "red" }}>{error && error.message}</div>
        </div>
    )
}
