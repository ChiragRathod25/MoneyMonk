import React, { useState } from "react";
import { Button, Error, Loading } from "../";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react"; // Alert icon

function LogoutBtn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.error("Error while logging out:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error errorMsg={error} />;

  return (
    <div>
      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <AlertCircle className="text-red-500 mx-auto mb-2" size={32} />
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600">You will be logged out.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
                Yes, Logout
              </Button>
              <Button className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <Button onClick={() => setShowConfirm(true)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg">
        Logout
      </Button>
    </div>
  );
}

export default LogoutBtn;
