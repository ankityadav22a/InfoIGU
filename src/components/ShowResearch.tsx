import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

interface Data {
  id: number;
  topic: string;
  start_date: string;
  field: string;
  financial_outlay: string;
  funding_agency: string;
  other_officers: string;
}

function createData(
  id: number,
  topic: string,
  start_date: string,
  field: string,
  financial_outlay: string,
  funding_agency: string,
  other_officers: string,
): Data {
  return {
    id,
    topic,
    start_date,
    field,
    financial_outlay,
    funding_agency,
    other_officers,
  };
}

const rows = [
  createData(
    1,
    "A semi-analytical method for hyperbolic conservation law: Application to Riemann problem.",
    "07 Mar 2022",
    "Applied Mathematics",
    "24 lacks.",
    "SERB-CORE, New Delhi, India",
    "",
  ),
  createData(
    2,
    "Analytical and Numerical Study of Nanofluid Flow over a Stretching Sheet in a Porous Medium.",
    "21 Oct 2023",
    "Applied Mathematics",
    "3.2 Lacks",
    "NBHM, Mumbai, India",
    "",
  ),
  createData(
    3,
    "Similarity Solutions of Shock waves in Chaplygin gas and Invariant Solutions of Some Non-Linear Evolution Equations.",
    "19 Oct 2023",
    "Applied Mathematics",
    "15 Lacks",
    "CSIR, New Delhi, India",
    "",
  ),
  createData(
    4,
    "Solutions of some non-linear evolution equations using Homotopy analysis method",
    "26 Feb 2022",
    "Applied Mathematics",
    "4 lacks",
    "UCOST Dehradun, India",
    "",
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "topic",
    numeric: false,
    disablePadding: true,
    label: "TOPIC",
  },
  {
    id: "start_date",
    numeric: false,
    disablePadding: false,
    label: "START DATE",
  },
  {
    id: "field",
    numeric: false,
    disablePadding: false,
    label: "FIELD",
  },
  {
    id: "financial_outlay",
    numeric: false,
    disablePadding: false,
    label: "FINANCIAL OUTLAY",
  },
  {
    id: "funding_agency",
    numeric: false,
    disablePadding: false,
    label: "FUNDING AGENCY",
  },
  {
    id: "other_officers",
    numeric: false,
    disablePadding: false,
    label: "OTHER OFFICERS",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {/* Removed Typography for 'Projects' to match the image, which has no explicit table title */}
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("topic"); // Default sort by topic
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, padding: "0 1rem" }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-row-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.topic}
                    </TableCell>
                    <TableCell align="left">{row.start_date}</TableCell>
                    <TableCell align="left">{row.field}</TableCell>
                    <TableCell align="left">{row.financial_outlay}</TableCell>
                    <TableCell align="left">{row.funding_agency}</TableCell>
                    <TableCell align="left">{row.other_officers}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length} />{" "}
                  {/* Updated colSpan */}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
