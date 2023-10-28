import { GoogleIcon } from "../icons/google-icon";
import { Button } from "../ui/button";
export const SocialSignInForm = () => {
  return (
    <Button variant="outline" className="w-full">
      <GoogleIcon className="mr-1.5 h-5 w-5 fill-primary" />
      Google
    </Button>
  );
};
