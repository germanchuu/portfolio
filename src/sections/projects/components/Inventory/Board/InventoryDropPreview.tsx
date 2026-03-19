import type { DragState } from "@/sections/projects/hooks/useInventoryDrag";

type InventoryDropPreviewProps = {
  dragState: DragState | null;
  invalid: boolean | null;
};

export default function InventoryDropPreview({
  dragState,
  invalid,
}: InventoryDropPreviewProps) {
  return dragState ? (
    <div
      className={`pointer-events-none z-19 h-full w-full rounded border ${
        invalid
          ? "border-destructive bg-destructive/20"
          : "border-primary/60 bg-primary/10"
      }`}
      style={{
        gridColumn: `${dragState.col + 1} / span ${dragState.sizeX}`,
        gridRow: `${dragState.row + 1} / span ${dragState.sizeY}`,
      }}
    />
  ) : null;
}
