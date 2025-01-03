"use client";

import { useState } from "react";

import { useGenshinOptions } from "@/hooks/GenshinOptionProvider";

export default function Page() {
  const { enemyCategories, enemies, loading } = useGenshinOptions();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEnemies = enemies.filter((enemy) =>
    selectedCategory ? enemy.enemyType === selectedCategory : true
  );

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">Genshin Database</h1>
      <p className="text-sm text-gray-500">
        Search for characters, weapons, materials, and more!
      </p>

      {loading ? (
        <p className="text-sm text-gray-700">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Enemy Categories</h2>
            <ul className="flex flex-col gap-2 bg-gray-200 p-4 rounded-md max-h-[20rem] overflow-y-auto">
              <li>
                <button
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setSelectedCategory(null)}
                >
                  ALL
                </button>
              </li>
              {enemyCategories.map((category) => (
                <li key={category}>
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">
              Enemies ({filteredEnemies.length})
            </h2>
            <ul className="flex flex-col gap-2 bg-gray-200 p-4 rounded-md max-h-[20rem] overflow-y-auto">
              {filteredEnemies.map((enemy) => (
                <li key={enemy.id}>
                  <span className="text-sm text-gray-700">{enemy.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
