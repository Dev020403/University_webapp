import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

const TableGrid = ({ rows, columns, rowsPerPage, recentApplication }) => {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return rows.slice(startIndex, endIndex);
  }, [page, rows, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
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
              total={pageCount}
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
        <TableBody items={paginatedRows}>
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
    </>
  );
};

export default TableGrid;
