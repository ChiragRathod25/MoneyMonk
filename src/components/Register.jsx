import React, { useEffect, useState } from "react";
import { Input, Button, Error, Loading } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
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

  const createUser = async (data) => {
    setError("");
    setLoading(false);
    try {
      setLoading(true);
      console.log(data);
      const newUser = await authService.createNewUser(data);
      if (newUser) {
        const user = await authService.getCurrentUser().then((response) => {
          console.log("Registered current user", response);

          if (response) {
            dispatch(login({ data }));
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
        <h2 className="text-2xl font-bold text-dark-blue mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(createUser)}>
        <Input
            label="Name"
            type="text"
            placeholder="Enter Name"
            {...register("name", { required: true })}
          />
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
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;