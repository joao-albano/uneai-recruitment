
import * as React from "react";
import { 
  Bar, 
  BarChart as RechartsBarChart,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip,
  CartesianGrid,
  Legend
} from "recharts";
import {
  TooltipProps as RechartsTooltipProps,
} from "recharts/types/component/Tooltip";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

export interface ChartConfig {
  [key: string]: {
    color?: string;
    label?: string;
  };
}

interface ChartContainerProps {
  className?: string;
  config: ChartConfig;
  children: React.ReactNode;
}

export function ChartContainer({
  className,
  config,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

interface ChartTooltipContentProps extends RechartsTooltipProps<ValueType, NameType> {
  formatter?: (value: any, name: any, props: any) => [string, string];
  labelFormatter?: (label: any) => string;
}

export function ChartTooltipContent({ 
  active, 
  payload, 
  label,
  formatter,
  labelFormatter,
}: ChartTooltipContentProps) {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-1">
          <div className="text-sm font-medium">
            {labelFormatter ? labelFormatter(label) : label}
          </div>
          {payload.map((item, index) => {
            let formattedValueAndName = [item.value, item.name];
            
            if (formatter) {
              formattedValueAndName = formatter(item.value, item.name, item);
            }
            
            return (
              <div
                key={`tooltip-item-${index}`}
                className="flex items-center gap-1 text-sm"
              >
                <div
                  className="h-2 w-2"
                  style={{
                    backgroundColor: item.color ?? "#888",
                  }}
                />
                <span className="text-muted-foreground">{formattedValueAndName[1]}:</span>
                <span className="font-medium">{formattedValueAndName[0]}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  return null;
}

export const ChartTooltip = RechartsTooltip;
