'use client'

import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function VerifyEmailPage() {
  // const router = useRouter()
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token})
      setVerified(true)
      setError(false)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data);
      toast.error(error.response.data)
    }
  }

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")

    // const { query } = router
    // const urlToken = query.token
    // setToken(urlToken?.toString || "")
  }, [])

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Verify Email</h1>
      <h2 className='bg-orange-500 text-black p-2'>{token? `${token}`: "No token"}</h2>
      {verified && (
        <h2 className='px-3 py-2 my-4 bg-green-500 rounded-md'>Verified</h2>
      )}
      {error && (
        <h2 className='px-3 py-2 my-4 bg-red-500 rounded-md'>Error</h2>
      )}
    </div>
  )
}