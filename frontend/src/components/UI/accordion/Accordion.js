import React from 'react'

const Accordion = ({children, collapse}) => {
  return (
    <div className='w-full mx-auto flex flex-col bg-white border-b-[2px] border-stone-300'>
        {children}
    </div>
  )
}

export default Accordion