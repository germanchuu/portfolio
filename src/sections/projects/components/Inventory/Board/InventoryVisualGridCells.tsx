type InventoryVisualGridCellsProps = {
  colums: number;
  rows: number;
  cellSize: number;
};

export default function InventoryVisualGridCells({
  colums,
  rows,
  cellSize,
}: InventoryVisualGridCellsProps) {
  const totalCells = colums * rows;

  return (
    <div
      className="pointer-events-none grid place-items-center justify-center overflow-auto pb-5"
      style={{
        gridTemplateColumns: `repeat(${colums}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
    >
      {Array.from({ length: totalCells }).map((_, idx) => (
        <div
          key={idx}
          className="border-border/30 bg-muted/20 rounded border"
          style={{
            width: `${cellSize - 10}px`,
            height: `${cellSize - 10}px`,
          }}
        />
      ))}
    </div>
  );
}
