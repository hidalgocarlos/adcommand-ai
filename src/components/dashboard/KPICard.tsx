import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  label?: string;
  status?: "good" | "warning" | "critical";
  className?: string;
}

export function KPICard({ title, value, trend, label, status, className }: KPICardProps) {
  const isPositive = trend >= 0;
  
  const statusColors = {
    good: "text-emerald-500",
    warning: "text-amber-500",
    critical: "text-red-500",
  };

  return (
    <Card className={cn("glass-card border-slate-800 bg-slate-900/50 backdrop-blur-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        {status && (
          <Badge variant="outline" className={cn("capitalize", statusColors[status])}>
            {status}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center pt-1 text-xs">
          <span className={cn("flex items-center font-medium", isPositive ? "text-emerald-500" : "text-red-500")}>
            {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
          {label && <span className="ml-1 text-slate-500">{label}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
