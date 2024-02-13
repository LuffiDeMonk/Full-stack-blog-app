import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

export default function FormButton() {
    const { pending } = useFormStatus()
    return (
        <Button type='submit' variant='default' aria-disabled={pending}>{pending ? "Loading..." : "Submit"}</Button>

    )
}
