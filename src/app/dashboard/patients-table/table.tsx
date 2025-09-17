'use client'

import * as React from "react"
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSession } from "next-auth/react"
import { format } from 'date-fns'
import { PrinterIcon, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"

// Dynamically import DeleteAppointment
const DeleteAppointment = dynamic(() => import('../delete-appointment/page'), { ssr: false })

// Define consistent column headers
const columnHeaders = {
  AppointmentId: "Id",
  Name: "Patient's Name",
  Doctor: "Doctor",
  Phone: "Phone",
  Gender: "Gender",
  Age: "Age",
  Address: "Address",
  createdAt: "Date",
  update: "Update",
  print: "Print",
  delete: "Delete",
}

interface Patient {
  _id: string
  AppointmentId: string
  Name: string
  Doctor: string
  Phone: string
  Age: string
  Gender: string
  Address: string
  createdAt: string
}

const columns = (role: string | undefined): ColumnDef<Patient>[] => {
  // Define the basic columns
  const basicColumns: ColumnDef<Patient>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "AppointmentId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {columnHeaders.AppointmentId}
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("AppointmentId")}</div>,
    },
    {
      accessorKey: "Name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {columnHeaders.Name}
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("Name")}</div>,
    },
    {
      accessorKey: "Doctor",
      header: columnHeaders.Doctor,
      cell: ({ row }) => <div>{row.getValue("Doctor")}</div>,
    },
    {
      accessorKey: "Phone",
      header: columnHeaders.Phone,
      cell: ({ row }) => <div>{row.getValue("Phone")}</div>,
    },
    {
      accessorKey: "Gender",
      header: columnHeaders.Gender,
      cell: ({ row }) => <div>{row.getValue("Gender")}</div>,
    },
    {
      accessorKey: "Age",
      header: columnHeaders.Age,
      cell: ({ row }) => <div>{row.getValue("Age")}</div>,
    },
    {
      accessorKey: "Address",
      header: columnHeaders.Address,
      cell: ({ row }) => <div>{row.getValue("Address")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: columnHeaders.createdAt,
      cell: ({ row }) => (
        <div>{format(new Date(row.getValue("createdAt")), 'yyyy-MM-dd HH:mm:ss')}</div>
      ),
    },
    {
      id: "update",
      header: columnHeaders.update,
      cell: ({ row }) => (
        <Link className="bg-gray-200 p-1 rounded" href={`/dashboard/update-appointment?id=${row.original._id}`}>
          <Edit className="text-gray-500 dark:text-white" />
        </Link>
      ),
    },
    {
      id: "print",
      header: columnHeaders.print,
      cell: ({ row }) => (
        <Link className="bg-gray-200" href={`/appointment-print/${row.original._id}`} target='_blank'>
          <PrinterIcon className=' text-gray-500 dark:text-white'/>
        </Link>
      ),
    },
  ];

  // Conditionally add the 'delete' column for non-manager roles
  if (role !== "Manager") {
    basicColumns.push({
      id: "delete",
      header: columnHeaders.delete,
      cell: ({ row }) => (
        <div className="bg-card">
          <DeleteAppointment id={row.original._id} />
        </div>
      ),
      enableHiding: false,
    });
  }

  return basicColumns;
};

export default function TableData({ appointmentTable }: { appointmentTable: Patient[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const data: Patient[] = appointmentTable;

  const { data: session } = useSession()
  const role = session?.user?.role

  const table = useReactTable({
    data,
    columns: columns(role),
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <Card className="rounded-md  bg-background  capitalize  px-5 h-full md:w-full w-screen overflow-hidden">
      <div className="md:w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder={`Filter by ${columnHeaders.Name.toLowerCase()}...`}
            value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnHeaders[column.id as keyof typeof columnHeaders] || column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded ">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className=" capitalize">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={Object.keys(columnHeaders).length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
