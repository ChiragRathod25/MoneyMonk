import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const isAuthenticate = useSelector((state) => state.auth.status);
  const navigate=useNavigate()
  useEffect(()=>{
  },[isAuthenticate,navigate])
  return (
    <div>
      <button>{isAuthenticate ? "Authorized" : "UnAuthorized"}</button>
    </div>
  );
}

export default Home;
