"use client";

import RetryJobButton from "../jobs/RetryJobButton";
import DeleteJobModal from "../jobs/DeleteJobModal";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";

import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useJobs, JobJob } from "@/hooks/useJobs";
import Pagination from "./Pagination";

export default function JobsTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(globalFilter);
      setPage(1); // Reset to page 1 on new search
    }, 300);
    return () => clearTimeout(handler);
  }, [globalFilter]);

  const { data, isLoading, isError, error } = useJobs(page, limit, debouncedFilter);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Failed to fetch jobs");
    }
  }, [isError, error]);

  const jobsData = data?.jobs || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const columns = useMemo<ColumnDef<JobJob>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
            {row.original.name}
          </span>
        ),
      },
      {
        id: "data",
        header: "Data",
        accessorKey: "data",
        cell: ({ row }) => (
          <span className="text-theme-sm text-gray-500 dark:text-gray-400">
            {JSON.stringify(row.original.data || {}).slice(0, 50)}
            {JSON.stringify(row.original.data || {}).length > 50 ? "..." : ""}
          </span>
        ),
      },
      {
        id: "priority",
        header: "Priority",
        accessorKey: "priority",
        cell: ({ row }) => (
          <span className="text-theme-sm text-gray-500 dark:text-gray-400">
            {row.original.priority}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          let status = "pending";
          let color: "success" | "warning" | "error" | "info" = "warning";
          
          if (row.original.failedAt) {
            status = "failed";
            color = "error";
          } else if (row.original.lastFinishedAt) {
            status = "finished";
            color = "success";
          } else if (row.original.lockedAt) {
            status = "running";
            color = "info";
          } else if (row.original.nextRunAt) {
            if (new Date(row.original.nextRunAt) > new Date()) {
               status = "scheduled";
               color = "info";
            } else {
               status = "jobd";
               color = "warning";
            }
          }

          return (
            <Badge size="sm" color={color}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const isFailed = !!row.original.failedAt;

          return (
            <div className="flex items-center gap-2">
              {!isFailed && <DeleteJobModal jobJob={row.original} />}
              {isFailed && <RetryJobButton jobJob={row.original} />}
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: jobsData,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Jobs
        </h3>
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9572 11.9572C12.2501 11.6643 12.7249 11.6643 13.0178 11.9572L16.2803 15.2197C16.5732 15.5126 16.5732 15.9874 16.2803 16.2803C15.9874 16.5732 15.5126 16.5732 15.2197 16.2803L11.9572 13.0178C11.6643 12.7249 11.6643 12.2501 11.9572 11.9572Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search jobs..."
              className="focus:border-brand-500 h-10 w-64 rounded-lg border border-gray-200 bg-white pr-4 pl-9 text-sm text-gray-700 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      isHeader
                      className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoading ? (
                <TableRow>
                  <td colSpan={columns.length} className="px-5 py-8 text-center text-gray-500">
                    Loading jobs...
                  </td>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <td colSpan={columns.length} className="px-5 py-8 text-center text-error-500">
                    Failed to fetch jobs.
                  </td>
                </TableRow>
              ) : jobsData.length === 0 ? (
                <TableRow>
                  <td colSpan={columns.length} className="px-5 py-8 text-center text-gray-500">
                    No jobs found.
                  </td>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-5 py-4 text-start sm:px-6"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 dark:border-white/5">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
