/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui";

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}: any) => {
  const handleLimitSelect = (newLimit: string) => {
    onLimitChange(parseInt(newLimit));
  };

  return (
    <div className="my-4 flex w-full items-center justify-between">
      {/* Limit Select */}
      <div className="mr-4 min-w-fit">
        <p>Show rows:</p>
      </div>
      <Select onValueChange={handleLimitSelect} value={limit.toString()}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={limit.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>

      {/* Pagination Controls */}
      <Pagination className="flex items-end justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button variant="outline" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
              First
            </Button>
          </PaginationItem>

          <PaginationItem className="rounded-md border">
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              //@ts-ignore
              disabled={currentPage === 1}
            />
          </PaginationItem>

          <div>
            <Button variant="outline">{`Page ${currentPage} of ${totalPages}`}</Button>
          </div>

          <PaginationItem className="rounded-md border">
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              // @ts-ignore
              disabled={currentPage === totalPages}
            />
          </PaginationItem>

          <PaginationItem>
            <Button
              variant="outline"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;