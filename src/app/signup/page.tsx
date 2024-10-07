'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data);
      router.push("/login")
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-medium mb-8 text-center'>{loading ? "Processing" : "Signup"}</h1>
        <label className='text-left mb-2' htmlFor="username">Username</label>
        <input className='p-2 rounded-md text-black' type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder='Username' /> <br />
        <label className='text-left mb-2' htmlFor="username">Email</label>
        <input className='p-2 rounded-md text-black' type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' /> <br />
        <label className='text-left mb-2' htmlFor="username">Password</label>
        <input className='p-2 rounded-md text-black' type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' /> <br />
        <button className='px-3 py-2 bg-blue-600 rounded-md w-max mx-auto font-medium -tracking-tighter hover:bg-blue-700 transition-all active:bg-blue-800 disabled:bg-blue-400 disabled:text-gray-300' disabled= {buttonDisabled} onClick={onSignup}>Sign Up</button>
        <Link href="/login" className='text-center my-4'>Visit Login </Link>
      </div>
    </div>
  )
}
