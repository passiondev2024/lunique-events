import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export const LicenseCodeCard = () => {
  // TODO: License Code Form
  return (
    <Card>
      <CardHeader className="space-y-0">
        <CardTitle>License codes</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-1.5">
        <Input placeholder="Enter your license code" className="flex-1" />
        <Button variant="secondary">Redeem</Button>
      </CardContent>
    </Card>
  );
};
