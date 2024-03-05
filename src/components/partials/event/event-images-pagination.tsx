"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationEnd,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStart,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const EventImagesPagination = ({ pages }: { pages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "");

  useEffect(() => {
    if (!page || page <= 0 || page > pages) {
      router.push(`${pathname}?page=1`);
    }
  }, [pathname, router, page, pages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationStart
            href={{ pathname, query: { page: 1 } }}
            className={cn(page === 1 && "pointer-events-none opacity-50 ")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            href={{ pathname, query: { page: page > 0 ? page - 1 : page } }}
            className={cn(page === 1 && "pointer-events-none opacity-50 ")}
          />
        </PaginationItem>

        {page > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem>
            <PaginationLink
              href={{ pathname: pathname, query: { page: page - 1 } }}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            isActive
            href={{ pathname: pathname, query: { page } }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < pages && (
          <PaginationItem>
            <PaginationLink
              href={{ pathname: pathname, query: { page: page + 1 } }}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < pages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={{ pathname, query: { page: page < pages ? page + 1 : page } }}
            className={cn(page === pages && "pointer-events-none opacity-50 ")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEnd
            href={{ pathname, query: { page: pages } }}
            className={cn(page === pages && "pointer-events-none opacity-50 ")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
