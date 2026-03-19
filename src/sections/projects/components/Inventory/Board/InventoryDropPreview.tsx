import type { DragState } from "@/sections/projects/hooks/useInventoryDrag";

type InventoryDropPreviewProps = {
  dragState: DragState | null;
};

export default function InventoryDropPreview({
  dragState,
}: InventoryDropPreviewProps) {
  return dragState ? (
    <div
      className="border-primary/60 bg-primary/10 pointer-events-none z-19 h-full w-full rounded border"
      style={{
        gridColumn: `${dragState.col + 1} / span ${dragState.sizeX}`,
        gridRow: `${dragState.row + 1} / span ${dragState.sizeY}`,
      }}
    />
  ) : null;
}
