type InventoryHeaderProps = {
  numItems: number;
  colums: number;
  rows: number;
};

export default function InventoryHeader({
  numItems = 0,
  colums,
  rows,
}: InventoryHeaderProps) {
  return (
    <div className="text-muted-foreground relative z-10 flex justify-between p-4 font-mono text-sm">
      <h3 className="tracking-widest uppercase">
        Inventory · {numItems} Projects
      </h3>
      <div className="flex items-center gap-10">
        <span className="text-primary/50">⟐ Drag to order</span>
        <span>
          {colums} x {rows} grid
        </span>
      </div>
    </div>
  );
}
