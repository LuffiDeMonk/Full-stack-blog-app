import React from 'react'

export default function Login() {
    return (
        <div className='flex items-center gap-3'>
            <input type="text" name='Email' placeholder='Enter your email' />
            <input type="password" name='Password' placeholder='Enter your passowrd' />
            <input type="text" name='Confirm_Password' placeholder='Confirm your password' />
        </div>
    )
}
