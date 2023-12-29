import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import schema from "../schema";

interface Props {
    params: { id: string }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    // Fetch data from a db
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    });
    // If not found, return 404 error
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // Else return data
    return NextResponse.json(user)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    // Validate the request body
    const body = await request.json();
    // If invalid, return 404
    const validation = schema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    // Fetch user with the given id
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })
    // If doesn't exist, return 404
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    // Update the user
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            name: body.name,
            email: body.email
        }
    })
    // Return the updated user
    return NextResponse.json(updatedUser)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    // Fetch user from db
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })
    // If not found, return 404
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // Delete the user 
    await prisma.user.delete({
        where: { id: user.id }
    })
    // Return 200
    return NextResponse.json({})
}