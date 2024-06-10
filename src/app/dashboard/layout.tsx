import { Dashboard } from "./dashboard"

export const metadata: Metadata = {
  title: "dashboard",
  description: "created by student power club",
};


import type { Metadata } from "next";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Dashboard children={children} />
    </section>
  )
}