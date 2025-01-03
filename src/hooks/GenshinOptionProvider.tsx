"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getEnemyCategories } from "@/lib/genshin/enemies";
import genshinDb, { Enemy } from "genshin-db";

interface GenshinOptionsProviderProps {
  children: React.ReactNode;
}

interface GenshinOptionsContextType {
  enemies: {
    id: number;
    name: string;
    monsterType: string;
    enemyType: string;
    description: string;
    image: string;
  }[];
  enemyCategories: string[];
  loading: boolean;
  error: Error | null;
}

const GenshinOptionsContext = createContext<GenshinOptionsContextType | null>(
  null
);

export function GenshinOptionsProvider({
  children,
}: GenshinOptionsProviderProps) {
  const [enemyCategories, setEnemyCategories] = useState<string[]>([]);
  const [enemies, setEnemies] = useState<
    {
      id: number;
      name: string;
      monsterType: string;
      enemyType: string;
      description: string;
      image: string;
    }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEnemyCategories = async () => {
      try {
        const options = await genshinDb.searchFolder("enemies", "enemyType");
        setEnemyCategories(options.dumpResult);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching enemy categories");
      }
    };

    const fetchEnemyNames = async () => {
      try {
        const enemyNames = await genshinDb.enemies("names", {
          matchCategories: true,
        });
        return enemyNames;
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching enemy names");
      }
    };

    const fetchEnemies = async () => {
      try {
        const enemyNames = await genshinDb.enemies("names", {
          matchCategories: true,
        });
        const enemies = enemyNames.map((enemy) => {
          const enemyDetails = genshinDb.enemies(enemy);
          return {
            id: enemyDetails?.id || 0,
            name: enemyDetails?.name || "",
            monsterType: enemyDetails?.monsterType || "",
            enemyType: enemyDetails?.enemyType || "",
            description: enemyDetails?.description || "",
            image: enemyDetails?.images.filename_icon || "",
          };
        });
        setEnemies(enemies);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching enemies");
      }
    };

    const fetchAll = async () => {
      Promise.all([fetchEnemyCategories(), fetchEnemies()]).then(() => {
        setLoading(false);
      });
    };

    fetchAll();
  }, []);

  return (
    <GenshinOptionsContext.Provider
      value={{ enemyCategories, enemies, loading, error }}
    >
      {children}
    </GenshinOptionsContext.Provider>
  );
}

export const useGenshinOptions = () => {
  const context = useContext(GenshinOptionsContext);
  if (!context) {
    throw new Error(
      "useGenshinOptions must be used within a GenshinOptionsProvider"
    );
  }
  return context;
};
