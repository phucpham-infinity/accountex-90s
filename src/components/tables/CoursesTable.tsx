"use client";

import CreateCourseModal from "../courses/CreateCourseModal";
import EditCourseModal from "../courses/EditCourseModal";
import DeleteCourseModal from "../courses/DeleteCourseModal";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useMemo, useState } from "react";

import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCourses, Course } from "@/hooks/useCourses";
import { useEffect } from "react";

export default function CoursesTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  // Simple debounce state for filter
  const [debouncedFilter, setDebouncedFilter] = useState("");

  // Simple debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(globalFilter);
    }, 300);
    return () => clearTimeout(handler);
  }, [globalFilter]);

  const { data, isLoading, isError } = useCourses(1, 10, debouncedFilter);

  const coursesData = data?.courses || [];

  const columns = useMemo<ColumnDef<Course>[]>(
    () => [
      {
        id: "title",
        header: "Course",
        accessorFn: (row) => row.title,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="h-10 w-16 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
              {row.original.image ? (
                <Image
                  width={64}
                  height={40}
                  src={row.original.image}
                  alt={row.original.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-brand-500">
                  No Img
                </div>
              )}
            </div>
            <div>
              <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                {row.original.title}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "price",
        header: "Price",
        accessorKey: "price",
        cell: ({ getValue }) => (
          <span className="text-theme-sm text-gray-500 dark:text-gray-400">
            ${Number(getValue<number>()).toLocaleString()}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue<string>();
          return (
            <Badge
              size="sm"
              color={
                status === "published"
                  ? "success"
                  : status === "draft"
                    ? "warning"
                    : "error" // archived
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <EditCourseModal course={row.original} />
            <DeleteCourseModal course={row.original} />
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: coursesData,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Courses
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
              placeholder="Search courses..."
              className="focus:border-brand-500 h-10 w-64 rounded-lg border border-gray-200 bg-white pr-4 pl-9 text-sm text-gray-700 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
            />
          </div>

          <CreateCourseModal />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
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
                    Loading courses...
                  </td>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <td colSpan={columns.length} className="px-5 py-8 text-center text-error-500">
                    Failed to fetch courses.
                  </td>
                </TableRow>
              ) : coursesData.length === 0 ? (
                <TableRow>
                  <td colSpan={columns.length} className="px-5 py-8 text-center text-gray-500">
                    No courses found.
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
    </div>
  );
}
