import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <div className='flex container mx-auto justify-between p-4'>
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
