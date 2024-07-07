"use client"

import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.MouseEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    try {
      const response = await fetch('/api/account/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      console.log('User registered:', data);
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
            <input type="text" className="grow" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
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