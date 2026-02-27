import React from 'react'
import DepartmentCard from './DepartmentCard'

const Showcase = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <DepartmentCard/>
      <DepartmentCard/>
      <DepartmentCard/>
      <DepartmentCard/>
      <DepartmentCard/>
    </div>
  )
}

export default Showcase