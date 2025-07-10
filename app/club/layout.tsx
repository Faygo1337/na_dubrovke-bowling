import type React from "react";
// import ClubHeader from "@/components/club-header";
// import ClubFooter from "@/components/club-footer"

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <ClubHeader /> */}
      <main className="min-h-screen bg-black">{children}</main>
      {/* <ClubFooter /> */}
    </>
  );
}
