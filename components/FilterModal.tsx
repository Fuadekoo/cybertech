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
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { format, isValid } from "date-fns";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (dateRange: DateRange) => void;
  isLoading?: boolean;
}

export function FilterModal({
  isOpen,
  onClose,
  onFilter,
  isLoading = false,
}: FilterModalProps) {
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
    if (dateRange.from && dateRange.to) {
      onFilter(dateRange);
      onClose();
    }
  };

  const clearSelection = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  const handleQuickFilter = (days: number) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);
    setDateRange({ from: startDate, to: today });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FilterIcon className="h-5 w-5" />
              Filter Data by Date Range
            </CardTitle>
            <CardDescription>
              Select a date range to filter your dashboard data
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <XIcon className="h-4 w-4" />
          </Button>
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

          {/* Quick Date Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">
              Quick filters:
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuickFilter(1)}
            >
              Yesterday
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuickFilter(7)}
            >
              Last 7 days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuickFilter(30)}
            >
              Last 30 days
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuickFilter(90)}
            >
              Last 90 days
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={handleFilter}
              disabled={!dateRange.from || !dateRange.to || isLoading}
              className="flex items-center gap-2"
            >
              <SearchIcon className="h-4 w-4" />
              {isLoading ? "Filtering..." : "Apply Filter"}
            </Button>

            <Button
              variant="outline"
              onClick={clearSelection}
              disabled={!dateRange.from && !dateRange.to}
            >
              Clear Selection
            </Button>

            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
