import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface EventImagesPagination {
  handleFetchNextPage: () => void;
  handleFetchPreviousPage: () => void;
  hasNextPage: boolean;
  page: number;
  pagesCount: number;
  imagesCount: number;
}

export const EventImagesPagination = ({
  page,
  pagesCount,
  imagesCount,
  hasNextPage,
  handleFetchPreviousPage,
  handleFetchNextPage,
}: EventImagesPagination) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <Button size="icon" variant="secondary" disabled>
        <ChevronsLeftIcon />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        onClick={handleFetchPreviousPage}
        disabled={page === 0}
      >
        <ChevronLeftIcon />
      </Button>
      <p className="text-zinc-500">
        Page {page + 1} of {Math.round(imagesCount / 20) + 1}
      </p>
      <Button
        size="icon"
        variant="secondary"
        onClick={handleFetchNextPage}
        disabled={!hasNextPage && page === pagesCount - 1}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        disabled={!hasNextPage && page === pagesCount - 1}
      >
        <ChevronsRightIcon />
      </Button>
    </div>
  );
};
