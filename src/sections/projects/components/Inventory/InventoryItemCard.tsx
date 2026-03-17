import React from "react";
import type { Project, InventoryItem } from "@/sections/projects/data/projects";

type InventoryItemCardProps = {
  project: Project;
  mouseDown: (
    e: React.MouseEvent<HTMLElement>,
    id: string,
    item: InventoryItem,
  ) => void;
  dragState: { id: string; col: number; row: number };
};

export default function InventoryItemCard({
  project,
  mouseDown,
  dragState,
}: InventoryItemCardProps) {
  const isDragging = dragState.id === project.id;
  const col = isDragging ? dragState.col : project.metadata.col;
  const row = isDragging ? dragState.row : project.metadata.row;

  return (
    <article
      key={project.id}
      onMouseDown={(e) => mouseDown(e, project.id, project.metadata)}
      className={`relative h-full w-full p-[5px] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{
        gridColumn: `${col + 1} / span ${project.metadata.sizeX}`,
        gridRow: `${row + 1} / span ${project.metadata.sizeY}`,
      }}
    >
      <div className="relative h-full rounded bg-red-500/30">
        <img
          className="h-full w-full rounded object-cover object-top"
          src={project.image.src}
          alt={project.title}
        />

        <span className="to-background from-background/40 absolute bottom-0 w-full rounded-b bg-linear-to-b p-2 text-end font-mono tracking-wide">
          {project.title}
        </span>
      </div>
    </article>
  );
}
