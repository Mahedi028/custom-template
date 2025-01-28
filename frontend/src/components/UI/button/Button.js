import React from 'react'

const Button = ({
    type,
    children,
    text,
    onClick,
    className
}) => {
  return (
    <button
    type={type}
    onClick={onClick}
    className={className?className:'bg-btnBackground text-textColor border-4 border-btnOutline px-4 py-4 font-title rounded-full text-xl cursor-pointer uppercase font-semibold hover:px-7 transition:px duration-150 hover:shadow-customShadow my-2'}
    >
    {children && children}
    {text && text}
    </button>
  )
}

export default Button