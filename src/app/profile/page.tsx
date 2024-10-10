'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("")

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/profile')
      console.log(res.data.data);
      setData(res.data.data._id)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("Logout successfully")
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-medium'>Profile page</h1>
      <h2 className='mt-5'>{data === "" ? "No Data" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button className='px-3 py-2 mt-5 bg-blue-600 rounded-md w-max mx-auto font-medium -tracking-tighter hover:bg-blue-700 transition-all active:bg-blue-800' onClick={getUserDetails}>Get User Details</button> <br />
      <button className='px-3 py-2 bg-gray-600 rounded-md w-max mx-auto font-medium -tracking-tighter hover:bg-gray-700 transition-all active:bg-gray-800' onClick={logout}>Logout</button>
    </div>
  )
}