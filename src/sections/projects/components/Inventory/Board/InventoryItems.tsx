import type { Project } from "@/sections/projects/data/projects";
import type { DragState } from "@/sections/projects/hooks/useInventoryDrag";
import InventoryItemCard from "./InventoryItemCard";

type InventoryItemsProps = {
  projects: Project[];
  dragState: DragState | null;
  mouseDown: (e: React.MouseEvent<HTMLElement>, project: Project) => void;
};

export default function InventoryItems({
  projects,
  dragState,
  mouseDown,
}: InventoryItemsProps) {
  return (
    <>
      {projects
        .filter((p) => p.id !== dragState?.id)
        .map((project) => {
          return (
            <InventoryItemCard
              key={project.id}
              project={project}
              mouseDown={(e) => mouseDown(e, project)}
              dragState={dragState}
            />
          );
        })}
    </>
  );
}
