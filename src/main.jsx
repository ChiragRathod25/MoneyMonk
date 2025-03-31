import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp, Login, Home, AddExpense, AddIncome,AddCategory,AddSubCategory,AddPaymentMode,AllExpense,AllIncome } from "./pages";
import {AuthLayout} from "./components"

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/category",
        element: (
          // <AuthLayout>
            <AddCategory />
          // </AuthLayout>
        ),
      },
      {
        path: "/subcategory",
        element: (
          // <AuthLayout>
            <AddSubCategory />
          // </AuthLayout>
        ),
      },
      {
        path: "/paymentmode",
        element: (
          // <AuthLayout>
            <AddPaymentMode />
          // </AuthLayout>
        ),
      },
      {
        path: "transaction",
        children: [
          {
            path: "expense",
            children:[
              {
                path: "",
                element: (
                  <AuthLayout>
                    <AddExpense />
                  </AuthLayout>
                ),
              },
              {
                path: "all",
                element: (
                  <AuthLayout>
                    <AllExpense />
                  </AuthLayout>
                ),
              }
            ]
          },
          {
            path: "income",
            children:[
              {
                path: "",
                element:(
                  <AuthLayout>
                    <AddIncome />
                  </AuthLayout>
                )
              },
              {
                path:"all",
                element:(
                  <AuthLayout>
                    <AllIncome />
                  </AuthLayout>
                )
              }
            ]
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // {/* </StrictMode> */}
);
