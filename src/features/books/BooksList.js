import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  MenuItem,
  Select,
  TablePagination,
} from "@mui/material";
import { useGetBooksQuery } from "../books/booksApiSlice";
import { useGetAuthorsQuery } from "./authorsApiSlice";

const debounce = (fn, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const BooksList = () => {
  const { data: authors, isAuthorsLoading } = useGetAuthorsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [authorId, setAuthorId] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const searchTermRef = useRef(null);

  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch: refetchBooks,
  } = useGetBooksQuery({
    name: searchTerm || "",
    author: authorId || "",
  });

  const delayedRefetch = useRef(
    debounce((params) => refetchBooks(params), 500)
  );

  useEffect(() => {
    delayedRefetch.current({ name: searchTerm, author: authorId });
    setPage(0);
  }, [searchTerm, authorId]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderContent = () => {
    if (isLoading || isAuthorsLoading) {
      return <p>Loading...</p>;
    } else if (isSuccess) {
      return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" mb={2}>
            Books List
          </Typography>

          <Container sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              label="Search"
              variant="outlined"
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flex: 1 }}
              inputRef={searchTermRef}
            />

            <FormControl
              variant="outlined"
              sx={{ marginLeft: "10px", flex: 1 }}
            >
              <Select
                label="Author"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <MenuItem key="all" value="all">
                  All
                </MenuItem>
                {authors.map((author, i) => (
                  <MenuItem key={i} value={author._id}>
                    {author.first_name} {author.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>

          {isLoading && <p>Loading...</p>}

          <TableContainer component={Container}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((book, i) => (
                    <TableRow key={i} hover>
                      <TableCell>{book.name}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>
                        {book.author.first_name} {book.author.last_name}
                      </TableCell>
                      <TableCell>{book.description}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Container>
      );
    } else if (isError) {
      return <p>{JSON.stringify(error)}</p>;
    }

    return null;
  };

  return renderContent();
};

export default BooksList;
