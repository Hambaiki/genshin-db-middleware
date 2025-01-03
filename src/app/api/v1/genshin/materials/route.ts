import { NextResponse } from "next/server";

import { getMaterials } from "@/lib/genshin/materials";

export async function GET() {
  const timeStart = performance.now();
  try {
    const materials = getMaterials();

    return NextResponse.json(
      {
        message: "Success",
        materials: materials,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching enemies:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    const timeEnd = performance.now();
    console.log(`Time taken: ${timeEnd - timeStart} milliseconds`);
  }
}
