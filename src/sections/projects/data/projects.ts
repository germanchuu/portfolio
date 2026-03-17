import Loscos from "@/assets/images/projects/Loscos.webp";
import Nogueras from "@/assets/images/projects/Nogueras.webp";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: ImageMetadata;
  stack?: string[];
  metadata: InventoryItem;
};

export type InventoryItem = {
  sizeX: number;
  sizeY: number;
  col: number; // 0-based
  row: number; // 0-based
};

export const Projects: Project[] = [
  {
    id: "loscos",
    title: "Loscos | Página Web",
    description: "Página web estática para el pueblo de Loscos.",
    image: Loscos,
    stack: ["Vite, React.js", "TypeScript"],
    metadata: {
      sizeX: 4,
      sizeY: 3,
      col: 1,
      row: 2,
    },
  },
  {
    id: "nogueras",
    title: "Nogueras | Página Web",
    description: "Página web estática para el pueblo de Nogueras.",
    image: Nogueras,
    stack: ["Vite, React.js", "TypeScript"],
    metadata: {
      sizeX: 4,
      sizeY: 3,
      col: 5,
      row: 1,
    },
  },
];
