import React from 'react'
import classes from './loader.module.css'
const CircleLoader = ({width, height, className}) => {
  return (
    <div
      className={className?className:"w-full h-screen bg-white flex justify-center items-center"}
      style={{
        width:width ,
        height:height ,
      }}
    >
      <div className={classes.load}></div>
    </div>
  )
}

export default CircleLoader