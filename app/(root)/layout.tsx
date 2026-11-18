import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const loggedin = { firstname: "Gideon", lastname: "Ovuzorie" };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedin} />
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
