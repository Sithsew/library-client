import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { useAddBookMutation } from "./booksApiSlice";
import { useGetAuthorsQuery } from "./authorsApiSlice";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    authorId: "",
    isbn: "",
    description: "",
  });
  const [addBookMutation, { isLoading, isError, error }] = useAddBookMutation();
  const { data: authors, isAuthorsLoading } = useGetAuthorsQuery();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBook = await addBookMutation(book).unwrap();
      console.log("New Book Added:", newBook);
      navigate("/books-list");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add a New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={book.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Author"
                placeholder="Select Author"
                name="authorId"
                fullWidth
                value={book.authorId}
                required
                onChange={handleChange}
              >
                {authors.map((author, i) => (
                  <MenuItem key={i} value={author._id}>
                    {author.first_name} {author.last_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ISBN"
                variant="outlined"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                name="description"
                value={book.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              {isError && (
                <div style={{ color: "red", marginTop: 10 }}>
                  Error: {error?.message}
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBook;
