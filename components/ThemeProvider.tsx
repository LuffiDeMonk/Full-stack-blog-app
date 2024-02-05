// app/providers.jsx

'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'

type Props = {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    return <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={true}>{children}</ThemeProvider>
}