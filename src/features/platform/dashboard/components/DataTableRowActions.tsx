"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { taskSchema } from "../data/schema";
import { deleteRequestAction } from "@/lib/actions/requests/request.actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RequestForm from "./RequestForm";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const deleteMutation = useMutation({
    mutationFn: () => deleteRequestAction(task.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError) {
        toast.error(serverError);
        return;
      }

      toast.success("Request deleted");

      router.refresh();
    },
  });

  return (
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
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="relative w-full flex cursor-pointer select-none items-center hover:bg-accent rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Edit
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-tertiary">
                    Edit your request
                  </DialogTitle>
                  <DialogDescription>
                    Did you make a mistake? Don't panic, just modify your
                    request.
                  </DialogDescription>
                </DialogHeader>
                <RequestForm request={task} setOpen={setOpen} />
              </DialogContent>
            </Dialog>
          </>
        </DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            deleteMutation.mutate();
          }}
        >
          {deleteMutation.isPending && (
            <Loader2 className="size-4 animate-spin" />
          )}
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
