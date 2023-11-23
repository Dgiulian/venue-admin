"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QrDialog } from "./qr-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().trim().email({
    message: "Username must be at least 2 characters.",
  }),
});

export default function RegisterPage() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const email = form.getValues("email");
    if (email) {
      fetch(`register/${email}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }
  const onClick = () => {
    const email = form.getValues("email");
    if (email) {
      fetch(`register/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="mt-24 text-2xl">Registrar nuevo ingreso</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-11 w-full  md:max-w-md"
        >
          <div className="flex flex-col items-start gap-2 p-4 md:flex-row md:items-center">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>Email del invitado</FormDescription>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <Button className="" onClick={() => setOpen(true)}>
              QR
            </Button>
            <Button className="" onClick={onClick}>
              Ingresar
            </Button>
          </div>
          {/* <Button type="submit">Registrar</Button> */}
        </form>
      </Form>

      <QrDialog
        open={open}
        setOpen={() => setOpen(!open)}
        onRead={(data) => {
          console.log(data);
          form.setValue("email", data);
          setOpen(false);
        }}
      />
    </div>
  );
}
