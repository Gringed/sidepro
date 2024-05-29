"use client";

import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  updateUserAction,
  updateUserSearchAction,
} from "@/lib/actions/users/user.actions";
import {
  UserType,
  UserSchema,
  UserSearchType,
} from "@/lib/actions/users/user.schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

// This can come from your database or API.
export type UserFormProps = {
  userId?: string;
  user: any;
};
export function ProfileForm(props: UserFormProps) {
  const defaultValues = {
    name: props.user.name,
    email: props?.user.email,
    rs: props?.user?.rs ?? [{ value: " " }],
    categories: props.user?.categories ?? [],
  };
  const form = useZodForm({
    schema: UserSchema,
    defaultValues: defaultValues,
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: UserType) => {
      const { data, serverError } = await updateUserAction({
        id: props.user.id,
        data: values,
      });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      router.refresh();
    },
  });

  const categories = [
    {
      id: "gaming",
      label: "Gaming",
    },
    {
      id: "react",
      label: "React",
    },
    {
      id: "sport",
      label: "Sport / Fitness",
    },
    {
      id: "arts",
      label: "Arts",
    },
    {
      id: "beauty",
      label: "Beauty",
    },
    {
      id: "mode",
      label: "Mode",
    },
    {
      id: "culture",
      label: "Culture",
    },
    {
      id: "photography",
      label: "Photography",
    },
    {
      id: "automobile",
      label: "Automobile",
    },
    {
      id: "travels",
      label: "Travels",
    },
    {
      id: "vlog",
      label: "Vlog",
    },
    {
      id: "cooking",
      label: "Cooking",
    },
    {
      id: "others",
      label: "Others",
    },
  ] as const;
  const { fields, append, remove } = useFieldArray({
    name: "rs",
    control: form.control,
  });
  const goToApp = useMutation({
    mutationFn: async (values: UserSearchType) => {
      console.log(values);
      const { data, serverError } = await updateUserSearchAction({
        id: props.user.id,
        data: { ...values, onBoard: true, type: "CONTENT" },
      });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      router.push("/dashboard");
    },
  });

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values);
      }}
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-5">
          <div className="flex gap-7">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="text-orange-400 font-medium">
                    This is your public display name. Not real name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input defaultValue={props.user.email} disabled />
                  </FormControl>
                  <FormDescription>
                    This is your provider email. It can't be change.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator className="!my-10" />
        <div className="flex flex-col">
          <span className="text-xl mb-2 font-semibold">
            Creator informations
          </span>

          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`rs.${index}.value`}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your many creator platforms or social media
                    profiles.
                  </FormDescription>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} />
                      <Button
                        variant={"destructive"}
                        onClick={() => remove(index)}
                        disabled={index <= 0}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            onClick={() => append({ value: "" })}
            disabled={fields?.length >= 6}
            variant="ghost"
            size="sm"
            className="mt-2"
          >
            Add URL
          </Button>
        </div>
        <hr className="border-gray-200/40" />
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base">Your Categories</FormLabel>
              <FormDescription>
                Select the categories you want to display in your profile.
              </FormDescription>

              <div className="grid grid-cols-3 !my-5 w-full gap-3">
                {categories.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start flex-1 space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || [];
                                return checked
                                  ? field.onChange([...currentValue, item.id])
                                  : field.onChange(
                                      currentValue?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" className="flex flex-end">
            Update profile
          </Button>
          {props.user?.jobs.length > 0 && props.user?.categories.length > 0 && (
            <Button
              type="button"
              onClick={async () => {
                await goToApp.mutateAsync(props.user);
              }}
              variant={"btnPrimary"}
              className="flex flex-end"
            >
              Go to application
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
