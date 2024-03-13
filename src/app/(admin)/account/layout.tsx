import { AccountNav } from "@/components/navigation/account-nav";
import React from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-3 border-b bg-background">
        <div className="mx-auto max-w-4xl">
          <AccountNav />
        </div>
      </div>
      <main className="mx-auto max-w-4xl py-5 md:py-10">{children}</main>
    </>
  );
}
