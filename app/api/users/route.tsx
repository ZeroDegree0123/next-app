import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
    // fetch users from a db
    const users = await prisma.user.findMany();
    // return users 
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    //Validate 
    const validation = schema.safeParse(body)
    // If invalid return 404
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

    const user = await prisma.user.findUnique({
        where: { email: body.email }
    })

    if (user) return NextResponse.json({ error: 'User already exists' }, { status: 400 })

    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    })
    return NextResponse.json(newUser, { status: 201 });
}