import type React from "react";
// import BowlingHeader from "@/components/bowling-header"
// import BowlingFooter from "@/components/bowling-footer"

export default function BowlingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <BowlingHeader /> */}
      <main className="min-h-screen">{children}</main>
      {/* <BowlingFooter /> */}
    </>
  );
}
