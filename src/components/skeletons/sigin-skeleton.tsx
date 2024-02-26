import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const SigninSkeleton = () => (
  <main className="h-fill flex animate-pulse items-center justify-center">
    <div className="w-full max-w-md">
      <Card className="border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center">
          <CardTitle className="h-4 w-40 rounded-lg bg-muted/80" />
          <CardDescription className="h-4 w-56 rounded-lg bg-muted/60" />
        </CardHeader>

        <div className="space-y-6 px-5 md:px-10">
          <div className="space-y-5">
            <div className="h-9 w-full rounded-lg bg-muted/20" />
            <div className="h-9 w-full rounded-lg bg-muted/60" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-[1px] flex-1 bg-muted/50" />
            <span className="h-3 w-32 rounded-lg bg-muted/20" />
            <div className="h-[1px] flex-1 bg-muted/50" />
          </div>
          <div className="h-9 w-full rounded-lg bg-muted/60" />
        </div>
      </Card>
    </div>
  </main>
);
