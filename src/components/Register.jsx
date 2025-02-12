import React, { useState } from "react";
import { Input, Button, Select } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUser = async (data) => {
    setError("");
    setLoading(false);
    try {
      setLoading(true);
      console.log(data);
      // await authService.logout()
      const newUser = await authService.createNewUser(data);
      if (newUser) {
        const user = await authService.getCurrentUser().then((response) => {
          console.log("Registered current user", response);

          if (response) {
            dispatch(login({data}));
            navigate("/");
          } else {
            dispatch(logout());
          }
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error while creating user", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error && error.length > 0) {
    return (
      <div>
        Error : <p>{error}</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(createUser)}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email", { required: true })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: true })}
        />

        <Button type="submit"> Sign Up</Button>
      </form>
    </div>
  );
}

export default Register;
