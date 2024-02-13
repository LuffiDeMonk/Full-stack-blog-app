import React from 'react'
import { Input } from '../ui/input'

export default function CustomImageUpload({ name }: { name: string }) {
    return (
        <div>
            <Input type='file' placeholder='Enter your image' name={name} />
        </div>
    )
}
