import React from 'react'

type Props = {
    heading: string
}

export default function CustomHeading({ heading }: Props) {
    return (
        <div className="text-2xl font-semibold pl-8 relative">
            <div className='absolute top-0 left-0 w-1 h-full rounded-full bg-purple-300'></div>
            {heading}
        </div>
    )
}