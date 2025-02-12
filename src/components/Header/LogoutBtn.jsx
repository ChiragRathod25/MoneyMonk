import React, { useState, useEffect } from "react";
import { Button } from "../";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutBtnHandler = async () => {
    console.log("Logout Btn handler called");

    setError("");
    setLoading(false);
    try {
      setLoading(true);
      authService.logout().then((response) => {
        dispatch(logout());
        window.location.reload()
      });
    } catch (error) {
      console.error("Error while logging out ", error);
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
      <Button onClick={() => LogoutBtnHandler()}>Logout</Button>
    </div>
  );
}

export default LogoutBtn;
