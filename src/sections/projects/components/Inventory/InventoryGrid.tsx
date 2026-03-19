import { useRef, useState } from "react";
import InventoryHeader from "./InventoryHeader";
import type { Project } from "@/sections/projects/data/projects";
import { Projects } from "@/sections/projects/data/projects";
import { useInventoryDrag } from "@/sections/projects/hooks/useInventoryDrag";
import InventoryVisualGridCells from "@/sections/projects/components/Inventory/Board/InventoryVisualGridCells";
import InventoryDragOverlay from "@/sections/projects/components/Inventory/Board/InventoryDragOverlay";
import InventoryDropPreview from "@/sections/projects/components/Inventory/Board/InventoryDropPreview";
import InventoryItems from "@/sections/projects/components/Inventory/Board/InventoryItems";

export const CELLS_COLS = 10;
export const CELLS_ROWS = 10;
export const CELLS_SIZE = 95;

export function InventoryGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [projects, setProjects] = useState<Project[]>(Projects);
  const { handleMouseDown, dragState, selectedProject } = useInventoryDrag(
    projects,
    setProjects,
    containerRef,
  );

  return (
    <div className="bg-card border-primary/30 relative min-w-0 flex-1 rounded-lg border backdrop-blur-sm">
      <div
        className="hero-scanlines pointer-events-none absolute inset-0 opacity-[0.015]"
        aria-hidden
      />

      <InventoryHeader
        numItems={projects.length}
        colums={CELLS_COLS}
        rows={CELLS_ROWS}
      />

      <div className="relative">
        <InventoryVisualGridCells
          colums={CELLS_COLS}
          rows={CELLS_ROWS}
          cellSize={CELLS_SIZE}
        />

        <div
          ref={containerRef}
          className="absolute inset-0 grid place-items-center justify-center overflow-auto"
          style={{
            gridTemplateColumns: `repeat(${CELLS_COLS}, ${CELLS_SIZE}px)`,
            gridTemplateRows: `repeat(${CELLS_ROWS}, ${CELLS_SIZE}px)`,
          }}
        >
          <InventoryItems
            projects={projects}
            dragState={dragState}
            mouseDown={handleMouseDown}
          />

          <InventoryDropPreview dragState={dragState} />
        </div>

        <InventoryDragOverlay
          dragState={dragState}
          selectedProject={selectedProject}
        />
      </div>
    </div>
  );
}
