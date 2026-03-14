import type React from "react";
import InventoryHeader from "./InventoryHeader";
import InventoryVisualGridCells from "./InventoryVisualGridCells";

export const CELLS_COLS = 10;
export const CELLS_ROWS = 10;
export const CELLS_SIZE = 95;

export function InventoryGrid() {
  let draggingItem: HTMLElement | null = null;

  function handleDragStart(
    e: React.DragEvent,
    data: { id: string; sizeX: number; sizeY: number },
  ) {
    draggingItem = e.currentTarget as HTMLElement;
    e.dataTransfer.setData(
      "application/x-inventory-card",
      JSON.stringify(data),
    );

    const img = new Image();
    img.src = "data:image/gif;base64,s=";

    e.dataTransfer.setDragImage(img, 0, 0);
  }

  function handleDragOver(e: React.DragEvent) {
    const isInventoryItem = e.dataTransfer.types.includes(
      "application/x-inventory-card",
    );
    if (!isInventoryItem || !draggingItem) return;

    e.preventDefault();
    const container = e.currentTarget;

    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left + container.scrollLeft;
    const y = e.clientY - rect.top + container.scrollTop;

    const row = Math.floor(y / CELLS_SIZE);
    const col = Math.floor(x / CELLS_SIZE);

    const itemJson = e.dataTransfer.getData("application/x-inventory-card");
    const item = JSON.parse(itemJson);

    if (col + item.sizeX <= CELLS_COLS) {
      draggingItem.style.gridColumn = `${col + 1} / span ${item.sizeX}`;
    }
    if (row + item.sizeY <= CELLS_ROWS) {
      draggingItem.style.gridRow = `${row + 1} / span ${item.sizeY}`;
    }

    console.log({ x, y, row, col });
  }

  return (
    <div className="bg-card border-primary/30 relative min-w-0 flex-1 rounded-lg border backdrop-blur-sm">
      <div
        className="hero-scanlines pointer-events-none absolute inset-0 opacity-[0.015]"
        aria-hidden
      />

      <InventoryHeader numItems={0} colums={CELLS_COLS} rows={CELLS_ROWS} />

      <div className="relative">
        <InventoryVisualGridCells
          colums={CELLS_COLS}
          rows={CELLS_ROWS}
          cellSize={CELLS_SIZE}
        />

        <div
          onDragOver={handleDragOver}
          className="absolute inset-0 grid place-items-center justify-center overflow-auto"
          style={{
            gridTemplateColumns: `repeat(${CELLS_COLS}, ${CELLS_SIZE}px)`,
            gridTemplateRows: `repeat(${CELLS_ROWS}, ${CELLS_SIZE}px)`,
          }}
        >
          <article
            draggable
            onDragStart={(e) =>
              handleDragStart(e, { id: "item_1", sizeX: 3, sizeY: 3 })
            }
            className="card relative h-full w-full p-[5px]"
            style={{
              gridColumn: "1 / span 3",
              gridRow: "2 / span 3",
            }}
          >
            <div className="bg-primary/30 h-full w-full rounded" />
          </article>

          <article
            draggable
            onDragStart={(e) =>
              handleDragStart(e, { id: "item_1", sizeX: 3, sizeY: 4 })
            }
            className="card relative h-full w-full p-[5px]"
            style={{
              gridColumn: "7 / span 3",
              gridRow: "1 / span 4",
            }}
          >
            <div className="h-full w-full rounded bg-red-500/30" />
          </article>

          <article
            draggable
            onDragStart={(e) =>
              handleDragStart(e, { id: "item_2", sizeX: 4, sizeY: 3 })
            }
            className="card relative h-full w-full p-[5px]"
            style={{
              gridColumn: "2 / span 4",
              gridRow: "6 / span 3",
            }}
          >
            <div className="h-full w-full rounded bg-green-500/30" />
          </article>
        </div>
      </div>
    </div>
  );
}
