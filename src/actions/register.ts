'use server'

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(prevState: any, formData: FormData) {
    try {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const name = formData.get("name") as string

        if (!email || !password) {
            return { error: "Email and password are required" }
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: "User already exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                // Initialize default profile or settings if needed
                pomodoroSettings: {
                    create: {
                        workDuration: 25,
                        shortBreakDuration: 5,
                        longBreakDuration: 15,
                    }
                },
                kanbanBoard: {
                    create: {
                        columnOrder: ['col-1', 'col-2', 'col-3'],
                        columns: {
                            create: [
                                { id: 'col-1', title: 'To Do', taskIds: [] },
                                { id: 'col-2', title: 'In Progress', taskIds: [] },
                                { id: 'col-3', title: 'Done', taskIds: [] }
                            ]
                        }
                    }
                },
                userProfile: {
                    create: {
                        // Default user profile
                        skills: [],
                        interests: []
                    }
                }
            }
        })

        return { success: "User created successfully" }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong" }
    }
}
