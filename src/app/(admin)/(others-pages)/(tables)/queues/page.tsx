import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import QueuesTable from "@/components/tables/QueuesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Queues | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Queues page for TailAdmin Tailwind CSS Admin Dashboard Template",
};

export default function QueuesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Queues Management" />
      <div className="space-y-6">
        <QueuesTable />
      </div>
    </div>
  );
}
