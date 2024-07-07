import Navbar from '@/components/layouts/Nav/Navbar'
import React from 'react'

export default function layout( {children }: { children: React.ReactNode} ) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}
