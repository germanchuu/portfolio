import type { Project } from "@/sections/projects/data/projects";
import type { DragState } from "@/sections/projects/hooks/useInventoryDrag";
import { CELLS_SIZE } from "@/sections/projects/components/Inventory/InventoryGrid";

type InventoryDragOverlayProps = {
  dragState: DragState | null;
  selectedProject: Project | null | undefined;
};

export default function InventoryDragOverlay({
  dragState,
  selectedProject,
}: InventoryDragOverlayProps) {
  return dragState && selectedProject ? (
    <article
      className="absolute z-20 scale-95 cursor-grabbing p-[5px] opacity-60"
      style={{
        left: dragState.mouseX,
        top: dragState.mouseY,
        width: selectedProject.metadata.sizeX * CELLS_SIZE,
        height: selectedProject.metadata.sizeY * CELLS_SIZE,
      }}
    >
      <div className="relative h-full overflow-hidden rounded">
        <img
          className="h-full w-full rounded object-cover object-top"
          src={selectedProject.image.src}
          alt={selectedProject.title}
        />

        <span className="to-background from-background/40 absolute right-0 bottom-0 left-0 rounded-b bg-linear-to-b p-2 text-end font-mono tracking-wide">
          {selectedProject.title}
        </span>
      </div>
    </article>
  ) : null;
}
