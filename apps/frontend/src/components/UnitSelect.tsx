import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const UNITS = ["g", "cup", "unit", "ml"] as const;

interface UnitSelectProps {
  unit: string;
  onUnitChange: (newValue: string) => void;
}

export function UnitSelect({ unit, onUnitChange }: UnitSelectProps) {
  return (
    <Select value={unit} onValueChange={onUnitChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {UNITS.map((unit) => (
            <SelectItem key={unit} value={unit}>
              {unit}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
