"use client";

import { Input } from "@/components/ui/input";

import { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
import { statuses } from "../data/data";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "./DataTableFicetedFilter";
import { DataTableViewOptions } from "./DataTableViewOptions";
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <PlusCircle className="ml-2 h-4 w-4 rotate-45" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
