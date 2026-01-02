'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getJournalEntries() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await prisma.journalEntry.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
    })
}

export async function createJournalEntry(data: {
    content: string
    mood: number
    createdAt: Date
}) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const entry = await prisma.journalEntry.create({
        data: {
            content: data.content,
            mood: data.mood,
            createdAt: data.createdAt,
            userId: session.user.id
        }
    })

    revalidatePath('/')
    return entry
}
