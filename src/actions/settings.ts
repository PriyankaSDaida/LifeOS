'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getPomodoroSettings() {
    const session = await auth()
    if (!session?.user?.id) return null

    return await prisma.pomodoroSettings.findUnique({
        where: { userId: session.user.id }
    })
}

export async function updatePomodoroSettings(data: {
    workDuration?: number
    shortBreakDuration?: number
    longBreakDuration?: number
}) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const current = await prisma.pomodoroSettings.findUnique({ where: { userId: session.user.id } })

    if (current) {
        await prisma.pomodoroSettings.update({
            where: { userId: session.user.id },
            data
        })
    } else {
        await prisma.pomodoroSettings.create({
            data: {
                userId: session.user.id,
                workDuration: data.workDuration || 25,
                shortBreakDuration: data.shortBreakDuration || 5,
                longBreakDuration: data.longBreakDuration || 15
            }
        })
    }

    revalidatePath('/')
}

export async function getUserProfile() {
    const session = await auth()
    if (!session?.user?.id) return null

    // Ensure creation if missing? Or just return null.
    return await prisma.userProfile.findUnique({
        where: { userId: session.user.id }
    })
}

export async function updateUserProfile(data: any) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const current = await prisma.userProfile.findUnique({ where: { userId: session.user.id } })

    // Data can contain partial updates. JSON for socials.

    if (current) {
        await prisma.userProfile.update({
            where: { userId: session.user.id },
            data
        })
    } else {
        await prisma.userProfile.create({
            data: {
                userId: session.user.id,
                ...data
            }
        })
    }
    revalidatePath('/')
}
