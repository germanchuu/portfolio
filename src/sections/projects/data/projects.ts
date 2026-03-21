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

enum Size {
  LARGE = 4,
  MEDIUM = 3,
  SMALL = 2,
}

const sizeTypes = {
  horizontal: (s: number) => ({ x: s, y: s - 1 }),
  vertical: (s: number) => ({ x: s - 1, y: s }),
  square: (s: number) => ({ x: s - 1, y: s - 1 }),
};

const selectedSize = Size.LARGE;

const sizes = {
  horizontal: sizeTypes.horizontal(selectedSize),
  vertical: sizeTypes.vertical(selectedSize),
  square: sizeTypes.square(selectedSize),
};

export const Projects: Project[] = [
  {
    id: "loscos",
    title: "Loscos",
    description: "Página web estática para el pueblo de Loscos.",
    image: Loscos,
    stack: ["Vite", "React.js", "TypeScript"],
    metadata: {
      sizeX: sizes.horizontal.x,
      sizeY: sizes.horizontal.y,
      col: 0,
      row: 0,
    },
  },
  {
    id: "nogueras",
    title: "Nogueras",
    description: "Página web estática para el pueblo de Nogueras.",
    image: Nogueras,
    stack: ["Vite", "React.js", "TypeScript"],
    metadata: {
      sizeX: sizes.horizontal.x,
      sizeY: sizes.horizontal.y,
      col: 3,
      row: 3,
    },
  },
  {
    id: "promotoras_ddhh",
    title: "Promotoras DDHH",
    description: "Página web estática para el pueblo de Nogueras.",
    image: Loscos,
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Azure", "AWS"],
    metadata: {
      sizeX: sizes.horizontal.x,
      sizeY: sizes.horizontal.y,
      col: 5,
      row: 6,
    },
  },
  {
    id: "granja_avicola_san_vicente_de_paul",
    title: "Granja Avícola",
    description: "Página web estática para el pueblo de Nogueras.",
    image: Nogueras,
    stack: ["Claude Code", "React Native", "Expo", "TypeScript", "Firebase"],
    metadata: {
      sizeX: sizes.vertical.x,
      sizeY: sizes.vertical.y,
      col: 1,
      row: 6,
    },
  },
  {
    id: "ides",
    title: "IDES",
    description: "Página web estática para el pueblo de Nogueras.",
    image: Nogueras,
    stack: ["Unity", "C#"],
    metadata: {
      sizeX: sizes.square.x,
      sizeY: sizes.square.y,
      col: 7,
      row: 1,
    },
  },
];
