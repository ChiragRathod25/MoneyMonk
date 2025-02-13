import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./Slices/authSlice";


function App() {
  console.log("App.jsx loaded");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setError("");
    setLoading(false);
    try {
      setLoading(true);
      authService.getCurrentUser().then((response) => {
        if (response) {
          console.log("App.jsx current user response", response);
          dispatch(login(response));
        } else {
          dispatch(logout());
        }
      });
    } catch (error) {
      console.error("Error(App.jsx) ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

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
    <>
      <Header />
      <main>
        {/* <h2>Welcome to money monk</h2> */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
