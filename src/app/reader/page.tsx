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
import { useCallback, useState } from "react";
import { QrCode } from "lucide-react";
import { getUserDisplayName } from "@/lib/utils";

const FormSchema = z.object({
  nombre: z.string().trim(),
});

export default function RegisterPage() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nombre: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const nombre = form.getValues("nombre");
    if (nombre) {
      console.log("Submit");
      fetch(`register`, {
        method: "POST",
        body: JSON.stringify({ nombre: nombre }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          form.setValue("nombre", "");
        });
    }
  }
  // const onClick = () => {
  //   const nombre = form.getValues("nombre");
  //   if (nombre) {
  //     fetch(`register/${nombre}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUser(data.user);
  //       });
  //   }
  // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce(() => {
      console.log("Pto");
      form.handleSubmit(onSubmit)();
    }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center ">
        <WelcomeMessage
          nombre={getUserDisplayName(user)}
          mesa={user.mesa ? user.mesa.toString() : ""}
        />
        <Button
          variant="outline"
          className="mt-10"
          onClick={() => {
            setUser(null);
            form.setValue("nombre", "");
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
                name="nombre"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        className="flex-1"
                        placeholder="Nombre"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="" onClick={() => setOpen(true)}>
                <QrCode />
              </Button>
            </div>
            <Button className="">Ingresar</Button>
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
          console.log("On Read", data);
          setOpen(false);
          form.setValue("nombre", data);
          debouncedSubmit();
        }}
      />
    </div>
  );
}

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): void => {
    console.log(timeoutId);
    if (timeoutId !== null) {
      console.log("Timeout cleared");
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), waitFor);
  };
}
