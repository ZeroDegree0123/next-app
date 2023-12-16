'use client';
import React from 'react'
import { useRouter } from 'next/navigation'

const NewUserPage = () => {
    const router = useRouter();

    return (
        <button
            className='daisy-btn daisy-btn-primary'
            onClick={() => router.push('/users')}
        >Create</button>
    )
}

export default NewUserPage