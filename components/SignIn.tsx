"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { auth_signInSchema, type SignInFormValues } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignInFormField } from "./CustomFormField";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/user.actions";

function SignInAuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(auth_signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormValues) {
    setIsLoading(true);
    try {
      const response = await signIn({
        email: data.email,
        password: data.password,
      });
      if (response) router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user ? "Link your account to get started" : "Please enter your details to get started"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col flex-4">{/* PLAID LINK */}</div>
      ) : (
        <>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <SignInFormField
                control={form.control}
                inputType="email"
                name="email"
                label="Email Address"
                placeholder="username@example.com"
                //   disabled={isLoading}
              />
              <SignInFormField
                control={form.control}
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                //   disabled={isLoading}
              />
              <div className="flex flex-col gap-4">
                {/* <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Reset
                </Button> */}
                <Button type="submit" form="form-rhf-demo" className="form-btn h-10" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Loading...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">Don&apos;t have an account?</p>
            <Link href="/sign-up" className="form-link">
              Sign Up
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default SignInAuthForm;
