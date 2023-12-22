import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, name: 'pants', price: 60 },
        { id: 2, name: 'shirt', price: 20 }
    ])
}

export async function POST(request: NextRequest) {
    const body = await request.json();


}