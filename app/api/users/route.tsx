import { NextRequest, NextResponse } from "next/server";

import schema from "./schema";

export function GET(request: NextRequest) {
    // fetch users from a db
    return NextResponse.json([
        { id: 1, name: 'Jarold' },
        { id: 2, name: 'Henry' },
    ]);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    //Validate 
    const validation = schema.safeParse(body)
    // If invalid return 404
    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 404 })
    return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}