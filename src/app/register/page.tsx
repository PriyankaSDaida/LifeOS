'use client'

import { useActionState } from 'react'
import { registerUser } from '@/actions/register'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(registerUser, null)

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-bold text-center dark:text-white">Create Account</h2>
                <form action={formAction} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required className="dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required className="dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required className="dark:bg-gray-700 dark:text-white" />
                    </div>
                    {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
                    {state?.success && (
                        <div className="text-green-500 text-sm">
                            {state.success}. <Link href="/login" className="underline font-bold">Login now</Link>
                        </div>
                    )}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Creating Account...' : 'Register'}
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm dark:text-gray-300">
                    Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}
