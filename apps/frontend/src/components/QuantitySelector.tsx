import { ChangeEvent, useEffect, useState } from "react";
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
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (/^\d*\.?\d*$/.test(e.target.value)) {
      const num = parseFloat(e.target.value);
      if (!isNaN(num)) {
        onQuantityChange(num);
      }
    }
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      setInputValue("0");
      onQuantityChange(0);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Input
          type="number"
          placeholder="quantity"
          className="w-32"
          min="0"
          step="0.1"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </div>
      <UnitSelect unit={unit} onUnitChange={onUnitChange} />
    </div>
  );
}
