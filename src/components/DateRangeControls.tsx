import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { clubTodayDate } from "@/lib/club-time";

export type Range = { from: Date; to: Date };

export const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Last 7 days", days: 6 },
  { label: "Last 30 days", days: 29 },
] as const;

export function daysAgo(n: number): Date {
  const d = clubTodayDate();
  d.setDate(d.getDate() - n);
  return d;
}

export function rangeLabel(range: Range): string {
  const from = format(range.from, "MMM d");
  const to = format(range.to, "MMM d, yyyy");
  return from === format(range.to, "MMM d") ? format(range.to, "MMM d, yyyy") : `${from} – ${to}`;
}

export function DateRangeControls({
  range,
  onChange,
  label = "Showing",
}: {
  range: Range;
  onChange: (range: Range) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-card-foreground">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("min-w-[240px] justify-start text-left font-normal")}>
            <CalendarIcon />
            {rangeLabel(range)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{ from: range.from, to: range.to }}
            onSelect={(value) => {
              if (!value?.from) return;
              onChange({ from: value.from, to: value.to ?? value.from });
            }}
            numberOfMonths={2}
            disabled={{ after: clubTodayDate() }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p.label}
            variant="ghost"
            size="sm"
            onClick={() => onChange({ from: daysAgo(p.days), to: clubTodayDate() })}
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
