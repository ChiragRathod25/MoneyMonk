import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";
import authService from "../appwrite/auth";
import { login, logout } from "../Slices/authSlice";

function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (data) => {
    setError("");
    setLoading(false);
    try {
      setLoading(true);
      console.log(data);
      // await authService.logout()
      const newUser = await authService.login(data);
      if (newUser) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login({ data }));
          navigate("/");
        } else {
          dispatch(logout());
        }
      }
      navigate("/");
    } catch (error) {
      console.error("Error while Logging in  user", error);
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
      <form onSubmit={handleSubmit(loginUser)}>
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

        <Button type="submit"> Login</Button>
      </form>
    </div>
  );
}

export default Login;
