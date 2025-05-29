"use server";

import { NextResponse } from "next/server";
import { addNews } from "@/shared/services";

export async function POST(req: Request) {
  try {
    const news = await req.json();
    await addNews(news);
    return NextResponse.json({ data: "Success", status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
