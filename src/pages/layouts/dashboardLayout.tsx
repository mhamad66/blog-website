import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <div className="container mx-auto flex px-4">
        <Sidebar />
        <main className="w-10/12">{children}</main>
      </div>
    </>
  );
}
