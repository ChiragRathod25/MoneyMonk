import React, { useEffect } from "react";
import { Button } from "../";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
 
  return (
    <div>
      {!authStatus && (
        <>
          <Link to="/register">
            <Button>SignUp</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </>
      )}
      {authStatus && <LogoutBtn />}
    </div>
  );
}

export default Header;
