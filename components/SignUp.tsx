"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FieldGroup } from "@/components/ui/field";
import { signUp } from "@/lib/actions/user.actions";
import { auth_signUpSchema, type SignUpFormValues } from "@/lib/utils";
import { Button } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { SignUpFormField } from "./CustomFormField";
import { useRouter } from "next/navigation";

function SignUpAuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(auth_signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true);
    try {
      const newUser = await signUp(data);
      // if (newUser) {
      setUser(newUser);
      // route.push("/");
      // }
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
              <div className="flex gap-4">
                <SignUpFormField control={form.control} name="firstName" label="First Name" placeholder="ex: John" />
                <SignUpFormField control={form.control} name="lastName" label="Last Name" placeholder="ex: Doe" />
              </div>
              <SignUpFormField control={form.control} name="address1" label="Address" placeholder="" />
              <SignUpFormField control={form.control} name="city" label="City" placeholder="Enter your City" />
              <div className="flex gap-4">
                <SignUpFormField control={form.control} name="state" label="State" placeholder="ex: Lagos" />
                <SignUpFormField
                  control={form.control}
                  inputType="number"
                  name="postalCode"
                  label="Postcode Name"
                  placeholder="ex: 1100111"
                />
              </div>
              <div className="flex gap-4">
                <SignUpFormField
                  control={form.control}
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="DD/MM/YYYY"
                />
                <SignUpFormField
                  control={form.control}
                  name="ssn"
                  inputType="number"
                  label="SSN"
                  placeholder="ex: 1234"
                />
              </div>
              <SignUpFormField
                control={form.control}
                inputType="email"
                name="email"
                label="Email"
                placeholder="Enter you email address"
              />
              <SignUpFormField
                control={form.control}
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
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
                    "Sign Up"
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">Already have an account?</p>
            <Link href="/sign-in" className="form-link">
              Sign In
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default SignUpAuthForm;
