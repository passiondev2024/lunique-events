import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UsageCardProps {
  title: string;
  max: number;
  value: number;
  info?: string;
}

export const UsageCard = ({ title, max, value, info }: UsageCardProps) => {
  return (
    <Card>
      <CardHeader className="px-5 pb-1.5">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1.5">
        {info && <CardDescription>{info}</CardDescription>}
        <CardDescription>{`${value} / ${max}`}</CardDescription>
        <Progress value={(value * 100) / max} />
      </CardContent>
    </Card>
  );
};
