import SignInAuthForm from "@/components/SignIn";

import React from "react";

function SignIn() {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <SignInAuthForm type="sign-in" />
    </section>
  );
}

export default SignIn;
