import React from 'react'
import { Link } from 'react-router-dom'
import { addIfDoesntExists } from '../../Services/localstorage.service'
export const Home = () => {
  addIfDoesntExists()
  return (
    <>
        <Link to="/add">Add Expense</Link>
        <br />
        <Link to="/show">Check All Data</Link>
    </>
  )
}