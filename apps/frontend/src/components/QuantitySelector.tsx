import { Input } from "./ui/input";
import { UnitSelect } from "./UnitSelect";

interface QuantitySelectorProps {
  quantity: number;
  unit: string;
  onQuantityChange: (value: number) => void;
  onUnitChange: (value: string) => void;
}

export function QuantitySelector({
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Input
          type="number"
          placeholder="Quantity"
          className="w-32 pr-8"
          min="0"
          step="0.1"
          value={quantity || 0}
          onChange={(e) => onQuantityChange(parseFloat(e.target.value) || 0)}
        />
      </div>
      <UnitSelect unit={unit} onUnitChange={onUnitChange} />
    </div>
  );
}
