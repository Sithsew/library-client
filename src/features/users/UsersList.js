import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Container,
} from "@mui/material";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Error: {JSON.stringify(error)}</Typography>;
  }

  if (isSuccess) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" mb={2}>
            Users List
          </Typography>

          {users.length === 0 ? (
            <Typography>No users found.</Typography>
          ) : (
            <List>
              {users.map((user, i) => (
                <ListItem key={i} alignItems="flex-start">
                  <ListItemText primary={user.username} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    );
  }

  return null;
};

export default UsersList;
