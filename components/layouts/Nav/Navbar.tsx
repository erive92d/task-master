
import Link from 'next/link'
import React from 'react'
import { headers } from 'next/headers';

export default function Navbar() {
    const headersList = headers();
    const pathname = headersList.get('x-pathname');
    const noNavRoutes = ['/', '/register'];
    console.log(pathname)

  return (
            <div className="navbar py-8 bg-primary text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
            <Link href="/" className="btn btn-ghost text-2xl font-bold">Task Master</Link>
        </div>
        <div className="navbar-end">
            {/* <a className="p-2 rounded bg-white text-black">Join us</a> */}
        </div>
        </div>
  )
}
