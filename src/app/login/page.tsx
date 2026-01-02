'use client'

import { useActionState } from 'react'
import { authenticate } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-center dark:text-white">Login to LifeOS</h2>
                <form action={formAction} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required className="dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required className="dark:bg-gray-700 dark:text-white" />
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-sm">{errorMessage}</div>
                    )}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm dark:text-gray-300">
                    Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}
