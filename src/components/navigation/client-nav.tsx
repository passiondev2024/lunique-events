import { ThemeToggle } from "../ui/theme-toggle";
import { ThemedLogoIcon } from "../icons/themed-logo-icon";

export const ClientNav = () => {
  return (
    <nav className="border-b">
      <div className="flex h-16 w-full items-center justify-between px-3">
        <ThemedLogoIcon />
        <ThemeToggle />
      </div>
    </nav>
  );
};
