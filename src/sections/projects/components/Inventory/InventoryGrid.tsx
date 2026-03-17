import { useEffect, useRef, useState } from "react";
import InventoryHeader from "./InventoryHeader";
import InventoryVisualGridCells from "./InventoryVisualGridCells";
import InventoryItemCard from "./InventoryItemCard";
import type { Project, InventoryItem } from "@/sections/projects/data/projects";
import { Projects } from "@/sections/projects/data/projects";

export const CELLS_COLS = 10;
export const CELLS_ROWS = 10;
export const CELLS_SIZE = 95;

export type DragState = {
  id: string;
  sizeX: number;
  sizeY: number;
  offsetX: number;
  offsetY: number;
  col: number;
  row: number;
};

export function InventoryGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [projects, setProjects] = useState<Project[]>(Projects);

  const [dragState, setDragState] = useState<DragState | null>(null);

  function handleMouseDown(
    e: React.MouseEvent<HTMLElement>,
    id: string,
    item: InventoryItem,
  ) {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const offsetX = e.clientX - (rect.left + item.col * CELLS_SIZE);
    const offsetY = e.clientY - (rect.top + item.row * CELLS_SIZE);

    setDragState({
      id: id,
      sizeX: item.sizeX,
      sizeY: item.sizeY,
      offsetX,
      offsetY,
      col: item.col,
      row: item.row,
    });

    e.preventDefault();
  }

  function handleMouseMove(clientX: number, clientY: number) {
    if (!dragState) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const rawX = clientX - rect.left + container.scrollLeft - dragState.offsetX;
    const rawY = clientY - rect.top + container.scrollTop - dragState.offsetY;

    const col = Math.floor(rawX / CELLS_SIZE);
    const row = Math.floor(rawY / CELLS_SIZE);

    const clampedCol = Math.max(0, Math.min(CELLS_COLS - dragState.sizeX, col));
    const clampedRow = Math.max(0, Math.min(CELLS_ROWS - dragState.sizeY, row));

    setDragState((prev) =>
      prev
        ? {
            ...prev,
            col: clampedCol,
            row: clampedRow,
          }
        : prev,
    );
  }

  function finishDrag() {
    if (!dragState) return;

    setProjects((prev) =>
      prev.map((project) =>
        project.id === dragState.id
          ? {
              ...project,
              metadata: {
                ...project.metadata,
                col: dragState.col,
                row: dragState.row,
              },
            }
          : project,
      ),
    );
    setDragState(null);
  }

  useEffect(() => {
    if (!dragState) return;

    document.body.style.cursor = "grabbing";

    function onMove(e: MouseEvent) {
      handleMouseMove(e.clientX, e.clientY);
    }

    function onUp() {
      finishDrag();
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragState]);

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
          {projects.map((project) => {
            return (
              <InventoryItemCard
                project={project}
                mouseDown={(e) =>
                  handleMouseDown(e, project.id, project.metadata)
                }
                dragState={{
                  id: dragState?.id!,
                  col: dragState?.col!,
                  row: dragState?.row!,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
