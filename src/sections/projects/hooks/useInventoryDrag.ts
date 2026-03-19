import type { Project } from "@/sections/projects/data/projects";
import {
  useEffect,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import {
  CELLS_COLS,
  CELLS_ROWS,
  CELLS_SIZE,
} from "../components/Inventory/InventoryGrid";
import { isOverlapping } from "@/sections/projects/utils/grid";

export type DragState = {
  id: string;
  sizeX: number;
  sizeY: number;
  offsetX: number;
  offsetY: number;
  mouseX: number;
  mouseY: number;
  col: number;
  row: number;
};

export const useInventoryDrag = (
  projects: Project[],
  setProjects: Dispatch<SetStateAction<Project[]>>,
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const [dragState, setDragState] = useState<DragState | null>(null);

  function handleMouseDown(e: React.MouseEvent<HTMLElement>, project: Project) {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cardRect = e.currentTarget.getBoundingClientRect();

    const offsetX = e.clientX - cardRect.left;
    const offsetY = e.clientY - cardRect.top;

    const rawX = e.clientX - rect.left + container.scrollLeft - offsetX;
    const rawY = e.clientY - rect.top + container.scrollTop - offsetY;

    setDragState({
      id: project.id,
      sizeX: project.metadata.sizeX,
      sizeY: project.metadata.sizeY,
      offsetX,
      offsetY,
      mouseX: rawX,
      mouseY: rawY,
      col: project.metadata.col,
      row: project.metadata.row,
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
            mouseX: rawX,
            mouseY: rawY,
            col: clampedCol,
            row: clampedRow,
          }
        : prev,
    );
  }

  function finishDrag() {
    if (!dragState) return;

    const isInvalid = projects.some(
      (p) => p.id !== dragState.id && isOverlapping(dragState, p),
    );

    if (isInvalid) {
      setDragState(null);
      return;
    }

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

  const selectedProject =
    dragState && projects.find((p) => p.id === dragState.id);

  const invalidPlacement =
    dragState &&
    projects.some((p) => p.id !== dragState.id && isOverlapping(dragState, p));

  return {
    handleMouseDown,
    handleMouseMove,
    finishDrag,
    dragState,
    selectedProject,
    invalidPlacement,
  };
};
