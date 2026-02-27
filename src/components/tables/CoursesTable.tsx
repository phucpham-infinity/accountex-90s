"use client";

import CreateCourseModal from "../courses/CreateCourseModal";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

export default function CoursesTable() {
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: "user",
        header: "User",
        accessorFn: (row) => row.user.name,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                width={40}
                height={40}
                src={row.original.user.image}
                alt={row.original.user.name}
              />
            </div>
            <div>
              <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                {row.original.user.name}
              </span>
              <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
                {row.original.user.role}
              </span>
            </div>
          </div>
        ),
      },
      {
        id: "projectName",
        header: "Project Name",
        accessorKey: "projectName",
        cell: ({ getValue }) => (
          <span className="text-theme-sm text-gray-500 dark:text-gray-400">
            {getValue<string>()}
          </span>
        ),
      },
      {
        id: "team",
        header: "Team",
        accessorFn: (row) => row.team.images.length,
        cell: ({ row }) => (
          <div className="flex -space-x-2">
            {row.original.team.images.map((teamImage, index) => (
              <div
                key={index}
                className="h-6 w-6 overflow-hidden rounded-full border-2 border-white dark:border-gray-900"
              >
                <Image
                  width={24}
                  height={24}
                  src={teamImage}
                  alt={`Team member ${index + 1}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
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
                status === "Active"
                  ? "success"
                  : status === "Pending"
                    ? "warning"
                    : "error"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "budget",
        header: "Budget",
        accessorKey: "budget",
        cell: ({ getValue }) => (
          <span className="text-theme-sm text-gray-500 dark:text-gray-400">
            {getValue<string>()}
          </span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      return (
        row.original.user.name.toLowerCase().includes(search) ||
        row.original.projectName.toLowerCase().includes(search)
      );
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Recent Orders
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
              placeholder="Search..."
              className="focus:border-brand-500 h-10 w-64 rounded-lg border border-gray-200 bg-white pr-4 pl-9 text-sm text-gray-700 placeholder-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
            />
          </div>

          {/* Filter Button */}
          <Button
            size="sm"
            variant="outline"
            startIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5H15M5.25 9H12.75M7.5 13.5H10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Filter
          </Button>
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
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
