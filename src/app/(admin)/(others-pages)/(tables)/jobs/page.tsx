import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import JobsTable from "@/components/tables/JobsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Jobs page for TailAdmin Tailwind CSS Admin Dashboard Template",
};

export default function JobsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Jobs Management" />
      <div className="space-y-6">
        <JobsTable />
      </div>
    </div>
  );
}
