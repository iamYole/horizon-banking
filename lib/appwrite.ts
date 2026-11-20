import "server-only";
import { Client, Account, Users, Databases } from "node-appwrite";
import { cookies } from "next/headers";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_SECRET!);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}

export async function createSessionClient() {
  const cookieStore = await cookies();

  const session = cookieStore.get("appwrite-session");

  if (!session?.value) {
    throw new Error("No active session");
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}
