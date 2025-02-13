import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Error, Input, Loading } from "./index";
import authService from "../appwrite/auth";
import { login, logout } from "../Slices/authSlice";

function Login() {
  const isAuthencticated = Boolean(localStorage.getItem("authStatus"));
  useEffect(() => {
    if (isAuthencticated) {
      navigate("/");
    }
  }, [isAuthencticated]);
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
      const newUser = await authService.login(data);
      if (newUser) {
        const user = await authService.getCurrentUser();
        if (user) {
          console.log("Current User", user);            
          dispatch(login(user));
          navigate("/");
        } else {
          dispatch(logout());
        }
      }
      navigate("/");
    } catch (error) {
      console.error("Error while Logging in user", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error && error.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <Error errorMsg={error} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-dark-blue mb-6">Login</h2>
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
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;