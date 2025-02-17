import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";

const TableGrid = ({
  rows,
  columns,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) => {
  const [page, setPage] = useState(currentPage || 1);

  useEffect(() => {
    setPage(currentPage || 1);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner color="primary" />
        </div>
      ) : rows.length === 0 ? (
        <div className="flex items-center justify-center h-96 bg-white">
          <p className="text-gray-500">No data available</p>
        </div>
      ) : (
        <Table
          aria-label="Example table with dynamic content"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item, index) => (
              <TableRow key={item.id ?? index}>
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.key}`}>
                    {getKeyValue(item, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TableGrid;
