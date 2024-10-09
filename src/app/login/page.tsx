'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data);
      router.push("/profile")
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-medium mb-8 text-center'>{loading ? "Processing" : "Login"}</h1>
        <label className='text-left mb-2' htmlFor="username">Email</label>
        <input className='p-2 rounded-md text-black' type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' /> <br />
        <label className='text-left mb-2' htmlFor="username">Password</label>
        <input className='p-2 rounded-md text-black' type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' /> <br />
        <button className='px-3 py-2 bg-blue-600 rounded-md w-max mx-auto font-medium -tracking-tighter hover:bg-blue-700 transition-all active:bg-blue-800 disabled:bg-blue-400 disabled:text-gray-300 disabled:cursor-not-allowed' disabled= {buttonDisabled} onClick={onLogin}>Login</button>
        <Link href="/signup" className='text-center my-4'>Visit Sign Up Page </Link>
      </div>
    </div>
  )
}
