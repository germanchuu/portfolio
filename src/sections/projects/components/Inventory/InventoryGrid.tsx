export const CELLS_COLS = 9;
export const CELLS_ROWS = 10;
export const CELLS_SIZE = 95;

export function InventoryGrid() {
  const totalCells = CELLS_COLS * CELLS_ROWS;

  return (
    <div className="bg-card border-primary/30 relative min-w-0 flex-1 rounded-lg border backdrop-blur-sm">
      <div
        className="hero-scanlines pointer-events-none absolute inset-0 opacity-[0.015]"
        aria-hidden
      />

      <div className="text-muted-foreground relative z-10 flex justify-between p-4 font-mono text-sm">
        <h3 className="tracking-widest uppercase">Inventory · 0 Items</h3>
        <div className="flex items-center gap-10">
          <span className="text-primary/50">⟐ Drag to order</span>
          <span>
            {CELLS_COLS} x {CELLS_ROWS} grid
          </span>
        </div>
      </div>

      <div className="relative h-full w-full">
        <div
          className="grid min-w-0 place-items-center justify-center overflow-auto pb-5"
          style={{
            gridTemplateColumns: `repeat(${CELLS_COLS}, ${CELLS_SIZE}px)`,
            gridTemplateRows: `repeat(${CELLS_ROWS}, ${CELLS_SIZE}px)`,
          }}
        >
          {Array.from({ length: totalCells }).map((_, idx) => (
            <div
              key={idx}
              className="border-border/30 bg-muted/20 rounded border"
              style={{
                width: `${CELLS_SIZE - 10}px`,
                height: `${CELLS_SIZE - 10}px`,
              }}
            />
          ))}
        </div>

        <div className="duration-fast absolute top-0 left-5 h-[285px] w-[190px] bg-green-400/0 p-[5px] transition-all hover:scale-150">
          <div className="bg-primary/20 h-full w-full rounded"></div>
        </div>

        <div className="absolute top-0 left-[210px] h-[190px] w-[285px] bg-green-400/0 p-[5px]">
          <div className="bg-primary/20 duration-fast h-full w-full rounded transition-all hover:scale-200"></div>
        </div>
      </div>
    </div>
  );
}
