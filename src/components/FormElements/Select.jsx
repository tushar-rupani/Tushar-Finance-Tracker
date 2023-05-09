import React from 'react'
import { InitialOption } from '../../pages/Form/InitialOption'
import { Option } from '../../pages/Form/Option'

export const Select = ({ value, name, register, handleChange, data, error }) => {
    return (
        <>
            <select name={name} value={value} {...register(name, {
                onChange: handleChange,
            })}>
                <InitialOption params={name} />
                {data.map((month, index) => (
                    <Option key={index} value={month} myKey={index} />
                ))}
            </select>
            <span style={{ color: "red" }}>{error && error.message}</span>

        </>
    )
}
