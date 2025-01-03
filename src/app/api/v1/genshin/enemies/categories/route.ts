import { NextResponse } from "next/server";

import { getEnemyCategories } from "@/lib/genshin/enemies";

export async function GET() {
  try {
    const categories = getEnemyCategories();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching enemy categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
