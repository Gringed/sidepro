"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserSchema,
  UserSearchSchema,
  UserSearchType,
  UserType,
} from "@/lib/actions/users/user.schema";
import { useMutation } from "@tanstack/react-query";
import {
  updateUserAction,
  updateUserSearchAction,
} from "@/lib/actions/users/user.actions";

export type UserFormProps = {
  userId?: string;
  user: any;
};

const SearchingForm = (props: UserFormProps) => {
  const [isOther, setIsOther] = useState<Boolean>(
    props.user.jobs.includes("other") ? true : false
  );
  const defaultValues = {
    jobs: props.user.jobs ?? [],
    other: props.user.other ?? "m@esdsxample.com",
    data: props.user.data ?? false,
    terms: props.user.terms ?? false,
  };
  const router = useRouter();
  const form = useZodForm({
    schema: UserSearchSchema,
    defaultValues: defaultValues,
  });
  const mutation = useMutation({
    mutationFn: async (values: UserSearchType) => {
      const { data, serverError } = await updateUserSearchAction({
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

  const jobs = [
    {
      id: "design",
      label: "Designer",
      icon: <Image src={"/draw.svg"} width={60} height={60} alt="" />,
    },
    {
      id: "miniaturist",
      label: "Miniaturist",
      icon: <Image src={"/minia.svg"} width={60} height={60} alt="" />,
    },
    {
      id: "video",
      label: "Video Editor",
      icon: <Image src={"/video.svg"} width={60} height={60} alt="" />,
    },
    {
      id: "code",
      label: "Developer",
      icon: <Image src={"/code.svg"} width={60} height={60} alt="" />,
    },
  ] as const;
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
      <FormField
        control={form.control}
        name="jobs"
        render={() => (
          <>
            <FormItem className="flex flex-col justify-between gap-1 pt-2">
              <FormLabel>Please, select the job you want</FormLabel>
              <FormMessage />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  flex-wrap items-center gap-10 !mb-5 justify-center md:justify-between">
                {jobs.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="jobs"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-1 w-full items-stretch  justify-center  h-full  space-x-3 space-y-0"
                        >
                          <FormLabel className=" cursor-pointer shadow text-sm font-normal flex items-center justify-center w-full rounded-xl transition-all  border border-whitesmoke p-1 hover:shadow-lg hover:border-tertiary [&:has([data-state=checked])]:border-noir [&:has([data-state=checked])]:bg-gradient-to-br from-transparent to-blue-200/10 [&:has([data-state=checked])]:hover:shadow-lg [&:has([data-state=checked])]:shadow-xl [&:has([data-state=checked])]:border-x-2">
                            <div className=" p-2 flex flex-col gap-2 items-center">
                              {item.icon}
                              <p className="font-semibold text-base">
                                {item.label}
                              </p>
                            </div>
                            <FormControl>
                              <Checkbox
                                className="hidden"
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];

                                  console.log(field.value);
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
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormField
                  control={form.control}
                  name="jobs"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-1 w-full items-stretch  justify-center  h-full  space-x-3 space-y-0">
                        <FormLabel className=" cursor-pointer shadow text-sm font-normal flex items-center justify-center w-full rounded-xl transition-all  border border-whitesmoke p-1 hover:shadow-lg hover:border-tertiary [&:has([data-state=checked])]:border-noir [&:has([data-state=checked])]:bg-gradient-to-br from-transparent to-blue-200/10 [&:has([data-state=checked])]:hover:shadow-lg [&:has([data-state=checked])]:shadow-xl [&:has([data-state=checked])]:border-x-2">
                          <div className=" p-2 flex flex-col gap-2 items-center">
                            <Image
                              src={"/others.svg"}
                              width={60}
                              height={60}
                              alt=""
                            />
                            <p className="font-semibold text-base">Other</p>
                          </div>
                          <FormControl>
                            <Checkbox
                              className="hidden"
                              checked={field.value?.includes("other")}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || [];
                                setIsOther(!isOther);
                                return checked
                                  ? field.onChange([...currentValue, "other"])
                                  : field.onChange(
                                      currentValue?.filter(
                                        (value) => value !== "other"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              </div>
              {isOther && (
                <div className="!mb-5">
                  <FormField
                    control={form.control}
                    name="other"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          If others, please select in the list
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@esdsxample.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@goodsqdgle.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@sudsqqpport.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </FormItem>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel>Data experience</FormLabel>
                      <FormDescription>
                        You accept that we collect your data to provide you with
                        a better experience, it will be used for our Linker to
                        choose you.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel>Terms & Conditions</FormLabel>
                      <FormDescription>
                        By checking this box you accept the{" "}
                        <Link
                          href={"/terms"}
                          className="hover:underline transition-all text-primary font-bold"
                          target="_blank"
                        >
                          terms and conditions
                        </Link>{" "}
                        of our application.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      />
      <div className="flex justify-between my-5">
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
    </Form>
  );
};

export default SearchingForm;
