import genshinDb from "genshin-db";

export function getMaterials() {
  try {
    const materialNames = genshinDb.materials("names", {
      matchCategories: true,
    });

    const materials = materialNames.map((materialName) => {
      const materialDetails = genshinDb.materials(materialName);
      return {
        id: materialDetails?.id || 0,
        name: materialDetails?.name || "",
        description: materialDetails?.description || "",
        image: materialDetails?.images.filename_icon || "",
      };
    });

    return materials;
  } catch {
    console.error("Error fetching materials");
    return [];
  }
}

export function searchMaterials({ name }: { name: string }) {
  try {
    const allMaterials = getMaterials();

    const searchText = name.toLowerCase();

    const material = allMaterials.filter((material) =>
      material.name.toLowerCase().includes(searchText)
    );

    return material.length > 0 ? material : null;
  } catch (error) {
    console.error("Error searching material:", error);
    return null;
  }
}

export function getMaterialCategories() {
  try {
    const materials = getMaterials();

    // Map unique categories
    const categories = new Set(materials.map((material) => material.name));

    return Array.from(categories);
  } catch (error) {
    console.error("Error fetching enemy categories:", error);
    return [];
  }
}
