'use client';

import React from 'react'
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

type Props = {}

export default function ThemeToggler({ }: Props) {
    const { theme, setTheme } = useTheme()
    return (
        <Button
            size='icon'
            variant="ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-90 dark:scale-0" />
        </Button>
    )
}