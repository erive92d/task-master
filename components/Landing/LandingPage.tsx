import Link from 'next/link'
import React from 'react'
import Login from '../Account/Login'

export default function LandingPage() {

  return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content gap-12 flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Task Master</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
             </div>
              <Login/>
            </div>
        </div>
        )
}
