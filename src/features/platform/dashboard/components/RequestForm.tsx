import React, { Dispatch } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RequestSchema,
  RequestType,
} from "@/lib/actions/requests/request.schema";
import { useMutation } from "@tanstack/react-query";
import {
  createRequestAction,
  updateRequestAction,
} from "@/lib/actions/requests/request.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RequestForm = ({ user, request, setOpen }: any) => {
  const router = useRouter();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const defaultValues = {
    randomUsername: request
      ? request?.randomUsername
      : user?.id?.substring(4, 6) + makeid(20),
    name: request ? request?.name : undefined,
    userId: request ? request?.userId : user.id,
    description: request ? request?.description : undefined,
    price: request ? request?.price : "<500",
  };

  const form = useZodForm({
    schema: RequestSchema,
    defaultValues: defaultValues,
  });
  const mutation = useMutation({
    mutationFn: async (values: RequestType) => {
      const { data, serverError } = !request?.id
        ? await createRequestAction(values)
        : await updateRequestAction({
            id: request.id,
            data: values,
          });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }
      if (request?.id) {
        toast.success("Request updated successfully");
      } else {
        toast.success("Request created successfully");
      }

      router.refresh();
      wait().then(() => setOpen(false));
    },
  });
  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values);
      }}
    >
      <div className="flex flex-col gap-4 py-4">
        <FormField
          control={form.control}
          name="randomUsername"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Public Identity</FormLabel>
              <FormControl>
                <Input
                  disabled
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                It is a random identifier allowing anonymity, not your id
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input defaultValue={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                This is your public display name. Not real name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Describe your request as fully as possible to help artists and
                designers understand what you want.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`price`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Price average</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="<500"> {"< 500 €"}</SelectItem>
                  <SelectItem value="500-1000">500 - 1000 €</SelectItem>
                  <SelectItem value="1000-2500">1000 - 2500 €</SelectItem>
                  <SelectItem value="2500-5000">2500 - 5000 €</SelectItem>
                  <SelectItem value=">5000">{"> 5000 €"}</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default RequestForm;
