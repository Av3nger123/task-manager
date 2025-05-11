"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useQueryState } from 'nuqs'

interface PaginationControlsProps {
    totalCount: number;
  }
  
export default function PaginationControls({ totalCount }: PaginationControlsProps) {
    const [page, setPage] = useQueryState("page", {
        defaultValue: 1,
        parse: Number,
        serialize: (v) => v.toString(),
      });
    
      const [limit, setLimit] = useQueryState("limit", {
        defaultValue: 10,
        parse: Number,
        serialize: (v) => v.toString(),
      });
    
      const totalPages = Math.ceil(totalCount / limit);
      const pageLimits = [5, 10, 20, 50, 100];
    
      const goLeft = () => {
        if (page > 1) setPage(page - 1);
      };
    
      const goRight = () => {
        if (page < totalPages) setPage(page + 1);
      };
    
      const handleLimitChange = (value: string) => {
        const newLimit = parseInt(value, 10);
        setLimit(newLimit);
        setPage(1); // reset to first page on limit change
      };
    

  return (
    <div className="w-full flex items-center justify-end gap-4">
     
      <Select value={limit.toString()} onValueChange={handleLimitChange}>
        <SelectTrigger >
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent>
          {pageLimits.map((val) => (
            <SelectItem key={val} value={val.toString()}>
              {val}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={goLeft} disabled={page === 1}>
          <ChevronLeftIcon/>
        </Button>
        <span className="text-sm">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <Button variant="outline" size="icon" onClick={goRight} disabled={page === totalPages}>
        <ChevronRightIcon/>

        </Button>
      </div>
    </div>
  );
}
