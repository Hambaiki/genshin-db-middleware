import genshinDb from "genshin-db";

export function getGenshinDb({ query }: { query: string }) {
  let source;
  switch (query) {
    case "materials":
      source = genshinDb.materials;
      break;
    case "enemies":
      source = genshinDb.enemies;
      break;
    case "characters":
      source = genshinDb.characters;
      break;
    case "weapons":
      source = genshinDb.weapons;
      break;
    case "artifacts":
      source = genshinDb.artifacts;
      break;
    case "domains":
      source = genshinDb.domains;
      break;
    case "achievements":
      source = genshinDb.achievements;
      break;
    case "materials":
      source = genshinDb.materials;
      break;
  }

  if (!source) return [];

  const objects = source("names", {
    matchCategories: true,
  }).map((objectName, index) => {
    const objectDetails = source(objectName);

    if (index === 0) {
      console.log(objectDetails);
    }

    return {
      id: objectDetails?.id || 0,
      name: objectDetails?.name || "",
      type: objectDetails?.type || "",
      rarity: objectDetails?.rarity || 0,
      description: objectDetails?.description || "",
      image: objectDetails?.images.filename_icon || "",
    };
  });
  return objects;
}

export function searchMaterials(query: string) {
  return getGenshinDb({ query: "materials" }).filter((material) =>
    material.name.toLowerCase().includes(query.toLowerCase())
  );
}

export function searchEnemies(query: string) {
  return getGenshinDb({ query: "enemies" }).filter((enemy) =>
    enemy.name.toLowerCase().includes(query.toLowerCase())
  );
}

export function searchCharacters(query: string) {
  return getGenshinDb({ query: "characters" }).filter((character) =>
    character.name.toLowerCase().includes(query.toLowerCase())
  );
}

export function searchWeapons(query: string) {
  return getGenshinDb({ query: "weapons" }).filter((weapon) =>
    weapon.name.toLowerCase().includes(query.toLowerCase())
  );
}
