import React from 'react'
import { addIfDoesntExists } from '../../Services/localstorage.service'
import { Navbar } from './Navbar'
export const Home = () => {
  addIfDoesntExists()
  return (
    <div style={{fontFamily: "arial"}}>
      <Navbar />
      <h4 style={{textAlign: "justify", fontWeight: "300", lineHeight: "25px"}}>In today's fast-paced world, keeping track of our finances has become more important than ever. Whether it's tracking our expenses, monitoring our income, or keeping an eye on our investments, having a clear understanding of our financial situation is crucial for making informed decisions. That's where the Finance Tracker app comes in. Designed using ReactJS, this app is a powerful tool for managing your finances and gaining greater insight into your financial health. With its intuitive user interface and robust features, the Finance Tracker app makes it easy to stay on top of your finances and achieve your financial goals.</h4>
      <h4> More about this task: <a href="https://dandy-muenster-6f1.notion.site/Finance-Tracker-ReactJS-exercise-f4fe19a5bb044610a87483e81238bd7a">Visit here.</a></h4>
    </div>
  )
}
