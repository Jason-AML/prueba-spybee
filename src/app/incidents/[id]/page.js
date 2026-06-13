import React from 'react'

const page = async({params}) => {
    const { id } =await  params;
     
  return (
    <div>
      <h1>Incident Details</h1>
      <p>Incident ID: {id}</p>
    </div>
  )
}

export default page
