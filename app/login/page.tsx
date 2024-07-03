import Login from '@/components/Account/Login'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold'>Login Page</h1>
        <Login/>
    </div>
  )
}
