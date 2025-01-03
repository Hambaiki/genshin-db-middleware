import genshinDb from "genshin-db";

export function getEnemies() {
  try {
    const enemyNames = genshinDb.enemies("names", { matchCategories: true });

    const enemies = enemyNames.map((enemyName) => {
      const enemyDetails = genshinDb.enemies(enemyName);
      return {
        id: enemyDetails?.id || 0,
        name: enemyDetails?.name || "",
        mosterType: enemyDetails?.monsterType || "",
        enemyType: enemyDetails?.enemyType || "",
        description: enemyDetails?.description || "",
        image: enemyDetails?.images.filename_icon || "",
      };
    });

    return enemies;
  } catch {
    console.error("Error fetching enemies");
    return [];
  }
}

export function searchEnemies({
  name,
  monsterType,
}: {
  name: string;
  monsterType?: string;
  enemyType?: string;
}) {
  try {
    const allEnemies = getEnemies();

    const searchText = name.toLowerCase();

    let enemy = allEnemies.filter((enemy) =>
      enemy.name.toLowerCase().includes(searchText)
    );

    if (monsterType) {
      enemy = enemy.filter((enemy) => enemy.mosterType === monsterType);
    }

    return enemy.length > 0 ? enemy : null;
  } catch (error) {
    console.error("Error searching enemy:", error);
    return null;
  }
}

export function getEnemyCategories() {
  try {
    const enemy = getEnemies();

    // Map unique categories
    const categories = new Set(enemy.map((enemy) => enemy.mosterType));

    return Array.from(categories);
  } catch (error) {
    console.error("Error fetching enemy categories:", error);
    return [];
  }
}
