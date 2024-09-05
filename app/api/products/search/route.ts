import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
const query = req.nextUrl.searchParams.get("query") || '';

  return NextResponse.json({});
}
