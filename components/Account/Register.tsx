"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()

  const handleRegister = async (e: React.MouseEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    try {
      const response = await fetch('/api/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      console.log('User registered:', data);
      router.push("/")

      // Handle successful registration (e.g., redirect or show success message)
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle registration failure (e.g., show error message)
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-base-200'>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleRegister}>
          <h1 className='text-xl font-bold text-center'>New Account</h1>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input type="password" placeholder="Password" className="grow" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <button type="submit" className='btn btn-success'>Register</button>
        </form>
      </div>
    </div>
  );
}