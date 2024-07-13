"use client"

import { useSession } from "next-auth/react"

export default function UserInfo() {
    const { data: user } = useSession()
    console.log(user)
  return (
    <div>UserInfo</div>
  )
}
