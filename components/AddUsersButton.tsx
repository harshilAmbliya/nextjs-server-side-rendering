"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const AddUsersButton = (props: Props) => {
    const router = useRouter();
    const handleRedirectUsers = () => {
        router.push("/users")
    }
  return (
    <button onClick={handleRedirectUsers} className='bg-blue-400  px-5 py-2 rounded-md hover:shadow-xl text-white hover:shadow-blue-200'>Add Users</button>
  )
}

export default AddUsersButton