'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getExpenses() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await prisma.expense.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' }
    })
}

export async function createExpense(data: {
    amount: number
    category: string
    description: string
    date: Date
}) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const expense = await prisma.expense.create({
        data: {
            amount: data.amount,
            category: data.category,
            description: data.description,
            date: data.date,
            userId: session.user.id
        }
    })

    revalidatePath('/')
    return expense
}

export async function deleteExpense(id: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const existing = await prisma.expense.findUnique({ where: { id } })
    if (!existing || existing.userId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.expense.delete({ where: { id } })
    revalidatePath('/')
}
