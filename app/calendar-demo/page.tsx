"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function CalendarDemoPage() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Calendar Component Demo
          </h1>
          <p className="text-muted-foreground">
            Interactive calendar with date range selection
          </p>
        </div>

        {/* Calendar Component */}
        <div className="flex justify-center">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar Range Selector
              </CardTitle>
              <CardDescription>
                Select a date range to filter your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                defaultMonth={date}
                numberOfMonths={2}
                selected={date}
                onSelect={setDate}
                className="rounded-lg border shadow-sm"
              />

              {date && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1">
                      Selected: {format(date, "PPP")}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
            <CardDescription>
              This calendar component supports both single date and date range
              selection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Single Date Selection</h4>
                <p className="text-sm text-muted-foreground">
                  Click on any date to select it. The selected date will be
                  highlighted.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Date Range Selection</h4>
                <p className="text-sm text-muted-foreground">
                  Click on start date, then end date to select a range. All
                  dates in between will be highlighted.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Two-month view for easy navigation</li>
                <li>• Keyboard navigation support</li>
                <li>• Responsive design</li>
                <li>• Customizable styling</li>
                <li>• Integration with date-fns for formatting</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
