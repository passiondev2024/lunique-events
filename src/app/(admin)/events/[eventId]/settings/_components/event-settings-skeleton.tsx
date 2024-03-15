import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const EventSettingsSkeleton = () => (
  <div className="animate-pulse space-y-5 pb-20 md:space-y-8">
    <div className="space-y-5">
      <Card className="border-muted/30">
        <CardHeader className="border-b border-muted/50">
          <CardTitle className="h-5 w-32 rounded-lg bg-muted/80" />
          <CardDescription className="h-4 w-36 rounded-lg bg-muted/60" />
        </CardHeader>
        <CardContent className="max-w-lg py-5">
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="h-4 w-28 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-20 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-24 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-32 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
          </div>
        </CardContent>
        <CardFooter />
      </Card>
      <Card className="border-muted/30">
        <CardHeader className="border-b border-muted/50">
          <CardTitle className="h-5 w-32 rounded-lg bg-muted/80" />
          <CardDescription className="h-4 w-36 rounded-lg bg-muted/60" />
        </CardHeader>
        <CardContent className="max-w-lg py-5">
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="h-4 w-28 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-20 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-24 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-32 rounded-lg bg-muted/50"></div>
              <div className="h-8 w-full rounded-lg bg-muted/20"></div>
            </div>
          </div>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  </div>
);
