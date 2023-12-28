import { NextRequest, NextResponse } from "next/server";

import schema from "../schema";
import { error } from "console";

interface Props {
    params: { id: number }
}

export function GET(request: NextRequest, { params }: { params: { id: number } }) {
    if (params.id > 10) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ id: 1, name: 'vase', price: 5 })
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 404 });

    if (params.id > 10) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ id: 1, name: body.name, price: body.price });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    if (params.id > 10) return NextResponse.json({ error: 'Product Not Found' }, { status: 404 });
    return NextResponse.json({});
}