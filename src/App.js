import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import BooksList from "./features/books/BooksList";
import Register from "./features/auth/Register";
import UsersList from "./features/users/UsersList";
import AddBook from "./features/books/AddBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="books-list" element={<BooksList />} />
          <Route path="users-list" element={<UsersList />} />
          <Route path="add-book" element={<AddBook />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
