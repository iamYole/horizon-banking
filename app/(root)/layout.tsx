import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// export default async function RootLayout({ children }: LayoutProps<"/">) {
//   const loggedin = await getLoggedInUser();

//   if (!loggedin) redirect("/sign-in");
//   return (
//     <main className="flex h-screen w-full font-inter">
//       <div>
//         <Suspense fallback={<div>Loading..</div>}>
//           <Sidebar user={loggedin} />
//         </Suspense>
//       </div>

//       <div className="size-full flex flex-col">
//         <div className="root-layout">
//           <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
//           <MobileNav user={loggedin} />
//         </div>
//         {children}
//       </div>
//     </main>
//   );
// }

async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const loggedin = await getLoggedInUser();

  if (!loggedin) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter">
      <div>
        <Sidebar user={loggedin} />
      </div>

      <div className="size-full flex flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <MobileNav user={loggedin} />
        </div>

        {children}
      </div>
    </main>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </Suspense>
  );
}
