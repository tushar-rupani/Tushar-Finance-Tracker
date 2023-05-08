import React from 'react'

export const Option = ({value, myKey}) => {
  let date = new Date().getTime();
  return (
    <option value={value} key={date}>{value}</option>
  )
}
