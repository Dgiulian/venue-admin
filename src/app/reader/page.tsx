"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import WelcomeMessage from "@/components/WelcomeMessage";
import { QRReaderDialog } from "@/components/qr-reader-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import { QrCode } from "lucide-react";

const FormSchema = z.object({
  email: z.string().trim().email({
    message: "Username must be at least 2 characters.",
  }),
});

export default function RegisterPage() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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
          setUser(data.user);
          `/viewer?nombre=Diego&mesa=12`;
        });
    }
  }
  const onClick = () => {
    const email = form.getValues("email");
    if (email) {
      fetch(`register/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
        });
    }
  };
  if (user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center ">
        <WelcomeMessage
          nombre={`${user.firstName} ${user.lastName}`}
          mesa={user.mesa.toString()}
        />
        <Button
          variant="outline"
          className="mt-10"
          onClick={() => {
            setUser(null);
            form.setValue("email", "");
          }}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="mt-24 text-2xl">Registrar nuevo ingreso</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-11 w-full  md:max-w-md"
        >
          <div className="flex flex-col items-start gap-2 p-4 md:flex-row md:items-end">
            <div className="flex w-full flex-row items-end gap-2 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="flex-1"
                        placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>Email del invitado</FormDescription> */}
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <Button className="" onClick={() => setOpen(true)}>
                <QrCode />
              </Button>
            </div>
            <Button className="" onClick={onClick}>
              Ingresar
            </Button>
          </div>
          {/* <Button type="submit">Registrar</Button> */}
        </form>
      </Form>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Volver
      </Link>
      <QRReaderDialog
        open={open}
        setOpen={() => setOpen(!open)}
        onRead={(data) => {
          form.setValue("email", data);
          setOpen(false);
        }}
      />
    </div>
  );
}
