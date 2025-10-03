"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { format, isValid } from "date-fns";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface CalendarFilterProps {
  onDateRangeChange: (dateRange: DateRange) => void;
  onFilter: () => void;
  isLoading?: boolean;
}

export function CalendarFilter({
  onDateRangeChange,
  onFilter,
  isLoading = false,
}: CalendarFilterProps) {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const formatDate = (date: Date | undefined) => {
    if (!date || !isValid(date)) return "Invalid date";
    return format(date, "PPP");
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      setDateRange({ from: selectedDate, to: undefined });
    } else {
      if (selectedDate < dateRange.from) {
        setDateRange({ from: selectedDate, to: dateRange.from });
      } else {
        setDateRange({ ...dateRange, to: selectedDate });
      }
    }
  };

  const handleFilter = () => {
    onDateRangeChange(dateRange);
    onFilter();
  };

  const clearSelection = () => {
    setDateRange({ from: undefined, to: undefined });
    onDateRangeChange({ from: undefined, to: undefined });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Date Range Filter
        </CardTitle>
        <CardDescription>
          Select a date range to filter your data. Click on start date, then end
          date.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar Component */}
        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
          />
        </div>

        {/* Selected Date Range Display */}
        {dateRange.from && (
          <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                {dateRange.from
                  ? formatDate(dateRange.from)
                  : "Select start date"}
              </Badge>
              <span className="text-muted-foreground">to</span>
              <Badge variant="outline" className="px-3 py-1">
                {dateRange.to ? formatDate(dateRange.to) : "Select end date"}
              </Badge>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={handleFilter}
            disabled={!dateRange.from || !dateRange.to || isLoading}
            className="flex items-center gap-2"
          >
            <SearchIcon className="h-4 w-4" />
            {isLoading ? "Filtering..." : "Filter Data"}
          </Button>

          <Button
            variant="outline"
            onClick={clearSelection}
            disabled={!dateRange.from && !dateRange.to}
          >
            Clear Selection
          </Button>
        </div>

        {/* Quick Date Presets */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">
            Quick filters:
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const today = new Date();
              const yesterday = new Date(today);
              yesterday.setDate(yesterday.getDate() - 1);
              setDateRange({ from: yesterday, to: today });
            }}
          >
            Yesterday
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const today = new Date();
              const weekAgo = new Date(today);
              weekAgo.setDate(weekAgo.getDate() - 7);
              setDateRange({ from: weekAgo, to: today });
            }}
          >
            Last 7 days
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const today = new Date();
              const monthAgo = new Date(today);
              monthAgo.setDate(monthAgo.getDate() - 30);
              setDateRange({ from: monthAgo, to: today });
            }}
          >
            Last 30 days
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
