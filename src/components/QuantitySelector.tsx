import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface QuantitySelectorProps {
  quantity: number;
  unit: string;
  onQuantityChange: (value: number) => void;
  onUnitChange: (value: string) => void;
}

const UNITS = ["g", "cup", "unit", "ml"] as const;

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
          value={quantity}
          onChange={(e) => onQuantityChange(parseFloat(e.target.value) || 0)}
        />
      </div>
      <Select value={unit} onValueChange={onUnitChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          {UNITS.map((unit) => (
            <SelectItem key={unit} value={unit}>
              {unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
