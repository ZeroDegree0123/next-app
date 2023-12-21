import { NextRequest, NextResponse } from "next/server";

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
    // If invalid return 404
    if (!body.name) return NextResponse.json({ error: 'Name is required' }, { status: 404 })
    return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}