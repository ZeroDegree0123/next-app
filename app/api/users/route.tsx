import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    // fetch users from a db
    return NextResponse.json([
        { id: 1, name: 'Jarold' },
        { id: 2, name: 'Henry' },
    ]);
}