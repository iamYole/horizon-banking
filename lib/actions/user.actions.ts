"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import path from "path";
import { ID } from "node-appwrite";
import { parseStringify, SignInFormValues } from "../utils";

export async function signIn(userData: { email: string; password: string }) {
  const { email, password } = userData;
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession({ email, password });

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return parseStringify(response);
  } catch (error) {
    console.log(error);
  }
}
export async function signUp(userData: SignUpParams) {
  const { email, password, firstName, lastName } = userData;

  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name: `${firstName} ${lastName}`,
    });
    const session = await account.createEmailPasswordSession({ email, password });

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log(error);
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.log("No authenticated user:", error);
    return null;
    // console.log(error);
  }
}

export async function logoutAccount() {
  try {
    const { account } = await createSessionClient();
    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");
    await account.deleteSession({ sessionId: "current" });
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false };
  }
}
