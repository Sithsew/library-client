import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./Register.css";
import { useRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

const ROLES_LIST = {
  Admin: 5051,
  User: 2001,
};

const UserForm = () => {
  const [userData, setUserData] = useState({
    user: "",
    pwd: "",
    roles: ROLES_LIST.Admin,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [register] = useRegisterMutation();

  const handleRegistration = async (e) => {
    try {
      e.preventDefault();

      const newUser = await register(userData).unwrap();
      console.log("New User Registered:", newUser);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegistration}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="user"
          value={userData.user}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="pwd"
          value={userData.pwd}
          onChange={handleChange}
          margin="normal"
          required
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="roles-label">Roles</InputLabel>
          <Select
            label="Roles"
            labelId="roles-label"
            name="roles"
            value={userData.roles}
            onChange={(e) =>
              handleChange({ target: { name: "roles", value: e.target.value } })
            }
          >
            {Object.entries(ROLES_LIST).map(([role, value]) => (
              <MenuItem key={value} value={{ [role]: value }}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
