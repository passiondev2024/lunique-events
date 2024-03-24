import { UserNav } from "@/components/navigation/user-nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNav />
      <main>{children}</main>
    </>
  );
}
