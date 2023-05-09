import React from 'react'
// import { InitialOption } from '../../pages/Form/InitialOption'
// import { Option } from '../../pages/Form/Option'

export const Select = ({ name, register, data, error }) => {
    return (
        <>
            <select name={name} {...register(name)}>
                <option value={""}>Select {name}</option>
                {data.map((element, index) => (
                    <option key={index} value={element}>{element}</option>
                ))}
            </select >
            <span style={{ color: "red" }}>{error && error.message}</span>
        </>
    )
}
