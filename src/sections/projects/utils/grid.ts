import type { Project } from "@/sections/projects/data/projects";
import type { DragState } from "@/sections/projects/hooks/useInventoryDrag";

export function isOverlapping(drag: DragState, project: Project) {
  const aLeft = drag.col;
  const aRight = drag.col + drag.sizeX;
  const aTop = drag.row;
  const aBottom = drag.row + drag.sizeY;

  const bLeft = project.metadata.col;
  const bRight = project.metadata.col + project.metadata.sizeX;
  const bTop = project.metadata.row;
  const bBottom = project.metadata.row + project.metadata.sizeY;

  const noOverlap =
    aRight <= bLeft || aLeft >= bRight || aBottom <= bTop || aTop >= bBottom;

  return !noOverlap;
}
