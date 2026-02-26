import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CoursesTable from "@/components/tables/CoursesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function CoursesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Courses" />
      <div className="space-y-6">
        <CoursesTable />
      </div>
    </div>
  );
}
