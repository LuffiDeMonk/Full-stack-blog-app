import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function Container({ children }: Props) {
    return (
        <div className='max-w-5xl mx-auto w-full px-4 lg:px-0'>{children}</div>
    )
}