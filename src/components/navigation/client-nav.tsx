import { SparklesIcon } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

export const ClientNav = () => {
  return (
    <nav className="border-b">
      <div className="flex h-16 w-full items-center justify-between px-3">
        <h1 className="flex items-center gap-1.5 font-serif text-2xl font-extralight">
          <SparklesIcon className="h-6 w-6" /> Eventify
        </h1>
        <ThemeToggle />
      </div>
    </nav>
  );
};
