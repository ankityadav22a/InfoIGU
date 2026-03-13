import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from '@mui/material/styles';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import * as React from "react";
import { Box, IconButton, TableFooter, TablePagination } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function ShowPublication({
  data,
}: {
  data: {
    Publication: string;
  }[];
}) {
  const [publications, setPublications] = React.useState(data);
  const [onEdit, setOnEdit] = React.useState<{ [key: string]: boolean }>(() =>
    Object.fromEntries(data.map((pub) => [pub.Publication, false]))
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - publications.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdd = () => {
    if (publications.find((pub) => pub.Publication === "")) return;
    const newPub = { Publication: "" };
    setPublications([newPub, ...publications]);
    setOnEdit((prev) => ({ ...prev, [newPub.Publication]: true }));
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pubToEdit = e.currentTarget.name;
    setOnEdit((prev) => ({ ...prev, [pubToEdit]: true }));
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pubToSave = e.currentTarget.name;
    const inputElement = document.querySelector(
      `input[name="${pubToSave}"]`
    ) as HTMLInputElement | null;
    if (inputElement && inputElement.value) {
      const updated = publications.map((pub) =>
        pub.Publication === pubToSave
          ? { ...pub, Publication: inputElement.value }
          : pub
      );
      setPublications(updated);
      setOnEdit((prev) => ({
        ...prev,
        [pubToSave]: false,
        [inputElement.value]: false,
      }));
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pubToCancel = e.currentTarget.name;
    // If it's a new row (empty string), remove it
    if (pubToCancel === "") {
      setPublications((prev) => prev.filter((pub) => pub.Publication !== ""));
      setOnEdit((prev) => {
        const copy = { ...prev };
        delete copy[pubToCancel];
        return copy;
      });
    } else {
      setOnEdit((prev) => ({ ...prev, [pubToCancel]: false }));
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pubToDelete = e.currentTarget.name;
    setPublications((prev) =>
      prev.filter((pub) => pub.Publication !== pubToDelete)
    );
    setOnEdit((prev) => {
      const copy = { ...prev };
      delete copy[pubToDelete];
      return copy;
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="publication table">
        <TableBody>
          <TableRow>
            <TableCell>Publication</TableCell>
            <TableCell align="right">
              <Button onClick={handleAdd}>Add</Button>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          {(rowsPerPage > 0
            ? publications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : publications).map((row) => (
              <TableRow
                key={row.Publication}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {onEdit[row.Publication] ? (
                    <input
                      className="border-b-2 focus:outline-none focus:border-blue-500"
                      placeholder="Publication"
                      name={row.Publication}
                      defaultValue={row.Publication}
                      style={{ display: "block", marginTop: "0.5rem" }}
                      required={true}
                    />
                  ) : (
                    row.Publication
                  )}
                </TableCell>
                {onEdit[row.Publication] ? (
                  <>
                    <TableCell align="right">
                      <Button onClick={handleSave} name={row.Publication}>
                        Save
                      </Button>
                    </TableCell>
                    <TableCell align="right" width={"2px"}>
                      <Button onClick={handleCancel} name={row.Publication}>
                        Cancel
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="right" width={"2px"}>
                      <Button onClick={handleEdit} name={row.Publication}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right" width={"2px"}>
                      <Button onClick={handleDelete} name={row.Publication}>
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={publications.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
