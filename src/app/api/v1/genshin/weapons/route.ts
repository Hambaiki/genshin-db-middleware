import { NextResponse } from "next/server";

import { searchWeapons } from "@/lib/genshin/genshin-db";

export async function GET() {
  const timeStart = performance.now();
  try {
    const weapons = searchWeapons("");

    return NextResponse.json(
      {
        message: "Success",
        weapons: weapons,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching weapons:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    const timeEnd = performance.now();
    console.log(`Time taken: ${timeEnd - timeStart} milliseconds`);
  }
}
