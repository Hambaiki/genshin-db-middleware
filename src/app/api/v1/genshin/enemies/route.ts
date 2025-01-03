import { NextResponse } from "next/server";

import { getEnemies, searchEnemies } from "@/lib/genshin/enemies";

export async function GET() {
  const timeStart = performance.now();
  try {
    const enemies = getEnemies();

    return NextResponse.json(
      {
        message: "Success",
        enemies: enemies,
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

export async function POST(request: Request) {
  const timeStart = performance.now();

  try {
    const {
      name = "",
      monsterType = "",
      enemyType = "",
    } = await request.json();

    const boss = searchEnemies({ name, monsterType, enemyType });

    return NextResponse.json({ message: "Success", boss }, { status: 200 });
  } catch (error) {
    console.error("Error searching enemy:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    const timeEnd = performance.now();
    console.log(`Time taken: ${timeEnd - timeStart} milliseconds`);
  }
}
