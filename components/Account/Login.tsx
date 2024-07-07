"use client"
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {


  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>("")
  const router = useRouter();

  const handleInputChange = () => {
    setError(null); // Reset error state to null on input change
  };


  const handleSubmit = async (e:React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError(null)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!result?.error) {
        router.push('/dashboard'); // Redirect to dashboard or any other authenticated route
      } else {
        const errorMessage = result.error;
        const startIndex = errorMessage.indexOf('"');
        const endIndex = errorMessage.lastIndexOf('"');
        const formattedErrorMessage = errorMessage.substring(startIndex + 1, endIndex);
        setError(formattedErrorMessage)
        console.error("Login Error:", result.error);
        // Handle error state or display error message to the user
      }
  
    } catch (error) {
      setError("Network error, please try again."); // Set custom error message
      console.error("Login Error:", error)
    }

  }


  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
       
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
          <label className="label">
              <span className="label-text">Email</span>
          </label>
          <input onChange={(e) => {setEmail(e.target.value); handleInputChange();}} type="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
          <label className="label">
              <span className="label-text">Password</span>
          </label>
          <input onChange={(e) => {setPassword(e.target.value); handleInputChange() }} type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
          </div>
          <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
              {error && <h1>{error}</h1>}
          </div>
          <div>
            
          <span>Need an account? click </span>
          <Link className='link' href="/register">here</Link>
          </div>
      </form>
    </div>
  )
}
