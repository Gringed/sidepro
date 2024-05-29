"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/features/landing/Section";
import React from "react";
import { DataTableToolbar } from "./DataTableToolbar";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./DataTablePagination";
import { Button } from "@/components/ui/button";
import { Briefcase, CaseLowerIcon, Eye, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

import RequestForm from "./RequestForm";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  user: any;
}
const Requests = <TData, TValue>({
  columns,
  data,
  user,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const invoices = [
    {
      invoice: "INV001",
      profession: "UX Designer",
      experience: "1 - 2 years",
    },
    {
      invoice: "INV002",
      profession: "Video Maker",
      experience: "2 - 3 years",
    },
    {
      invoice: "INV003",
      profession: "Graphist",
      experience: "> 5 years",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      profession: "UX Designer",
      experience: "4 - 5 years",
    },
    {
      invoice: "INV005",
      profession: "UX Designer",
      experience: "4 - 5 years",
    },
    {
      invoice: "INV006",
      profession: "Video Maker",
      experience: "< 1 year",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      profession: "Graphist",
      experience: "< 1 year",
    },
  ];

  return (
    <Section className=" ">
      <div className="flex w-full  flex-col lg:flex-row   gap-5">
        <Card className="w-full  lg:w-2/3 overflow-auto h-full ">
          <CardHeader className="flex flex-row justify-between">
            <div className="space-y-1">
              <CardTitle className="text-tertiary">Your requests</CardTitle>
              <CardDescription>Find all your requests here</CardDescription>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="SimplebtnPrimary"
                  className=" mt-0 h-8 px-2 lg:px-3"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-tertiary">
                    Add new request
                  </DialogTitle>
                  <DialogDescription>
                    Make a request to our creatives. Send when you're done.
                  </DialogDescription>
                </DialogHeader>
                <RequestForm user={user} setOpen={setOpen} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className=" h-[60vh] ">
            <div className="space-y-4">
              <DataTableToolbar table={table} />
              <div className="rounded-md  border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id} colSpan={header.colSpan}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <DataTablePagination table={table} />
            </div>
          </CardContent>
        </Card>
        <Card className="lg:w-1/3 ">
          <CardHeader className="pb-[1.4rem]">
            <CardTitle className="text-tertiary">
              Profiles that might interest you
            </CardTitle>
            <CardDescription>
              Find all the profiles of interest to you here.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <Button
                variant="SimplebtnPrimary"
                className="h-8 px-2 lg:px-3 text-sm"
              >
                <Eye className="mr-2 h-4 w-4" />
                See more
              </Button>
              <div className="rounded-md  border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]"></TableHead>
                      <TableHead>Profession</TableHead>

                      <TableHead className="text-left">Experience</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/Gringed.png"
                              alt="@Gringed"
                            />
                            <AvatarFallback>AG</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>{invoice.profession}</TableCell>
                        <TableCell className="text-right ">
                          <div className="flex gap-2 items-center justify-start">
                            <Briefcase size={10} /> {invoice.experience}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="flex h-8 w-8 rounded-full p-0 data-[state=open]:bg-muted"
                              >
                                <DotsHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[160px]"
                            >
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Make a copy</DropdownMenuItem>
                              <DropdownMenuItem>Favorite</DropdownMenuItem>
                              <DropdownMenuSeparator />

                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Delete
                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Requests;
