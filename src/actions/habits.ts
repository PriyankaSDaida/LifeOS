'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { startOfToday, isSameDay, startOfDay, subDays } from 'date-fns'

export async function getHabits() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await prisma.habit.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
    })
}

export async function createHabit(data: {
    title: string
    frequency: string
}) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const habit = await prisma.habit.create({
        data: {
            title: data.title,
            frequency: data.frequency,
            userId: session.user.id,
            completedDates: [],
            streak: 0
        }
    })

    revalidatePath('/')
    return habit
}

export async function deleteHabit(id: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const existing = await prisma.habit.findUnique({ where: { id } })
    if (!existing || existing.userId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.habit.delete({ where: { id } })
    revalidatePath('/')
}

export async function toggleHabitCompletion(id: string, date: Date) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const habit = await prisma.habit.findUnique({ where: { id } })
    if (!habit || habit.userId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    const isCompletedToday = habit.completedDates.some(d => isSameDay(d, date))
    let newCompletedDates = isCompletedToday
        ? habit.completedDates.filter(d => !isSameDay(d, date))
        : [...habit.completedDates, date]

    // Streak Logic (simplified from store)
    const sortedDates = newCompletedDates.sort((a, b) => b.getTime() - a.getTime())
    let streak = 0

    if (sortedDates.length > 0) {
        // Logic similar to store...
        const latest = sortedDates[0]
        const diffToToday = (startOfToday().getTime() - startOfDay(latest).getTime()) / (1000 * 3600 * 24)
        if (diffToToday <= 1) {
            streak = 1
            let prev = latest
            for (let i = 1; i < sortedDates.length; i++) {
                const curr = sortedDates[i]
                const diff = (startOfDay(prev).getTime() - startOfDay(curr).getTime()) / (1000 * 3600 * 24)
                if (diff === 1) {
                    streak++
                    prev = curr
                } else {
                    break
                }
            }
        }
    }

    const updated = await prisma.habit.update({
        where: { id },
        data: {
            completedDates: newCompletedDates,
            streak
        }
    })

    revalidatePath('/')
    return updated
}
