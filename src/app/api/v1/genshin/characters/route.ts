import { NextResponse } from "next/server";

import { searchCharacters } from "@/lib/genshin/genshin-db";

export async function GET() {
  const timeStart = performance.now();
  try {
    const characters = searchCharacters("");

    return NextResponse.json(
      {
        message: "Success",
        characters: characters,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    const timeEnd = performance.now();
    console.log(`Time taken: ${timeEnd - timeStart} milliseconds`);
  }
}
