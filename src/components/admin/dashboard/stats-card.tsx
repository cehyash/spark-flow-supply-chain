
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: {
    value: string;
    positive: boolean;
  };
}

export default function StatsCard({ title, value, icon, description, change }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || change) && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
            {change && (
              <span className={change.positive ? "text-green-500" : "text-red-500"}>
                {change.positive ? "+" : ""}{change.value}
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
