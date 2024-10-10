import React from 'react'

function page({params}:any) {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-medium'>Profile page</h1>
      <p className='bg-gray-600 rounded p-3 my-4'>{params.id}</p>
    </div>
  )
}

export default page