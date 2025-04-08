import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SignUp,
  Login,
  Home,
  AddExpense,
  AddIncome,
  AddCategory,
  AddSubCategory,
  AddPaymentMode,
  AllExpense,
  AllIncome,
  Report,
  AllTransactions,
  Transaction,
  ExpenseCategoryPieChart,
  ExpenseCategoryToSubCategoryPieChart,
  IncomeSubCategoryPieChart,
  PaymentModeDistributionBarChart,
  IncomeLineGraph,
  ExpenseLineGraph,
} from "./pages";
import { AuthLayout } from "./components";

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
            path: "",
            element: (
              // <AuthLayout>
              <AllTransactions />
              // </AuthLayout>
            ),
          },
          {
            path: "view/:transactionId",
            element: (
              // <AuthLayout>
              <Transaction />
              // </AuthLayout>
            ),
          },
          {
            path: "expense",
            children: [
              {
                path: "add",
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
              },
            ],
          },
          {
            path: "income",
            children: [
              {
                path: "add",
                element: (
                  <AuthLayout>
                    <AddIncome />
                  </AuthLayout>
                ),
              },
              {
                path: "all",
                element: (
                  // <AuthLayout>
                  <AllIncome />
                  // </AuthLayout>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "reports",
        // element: (
        //   // <AuthLayout>
        //   <Report />
        //   // {/* </AuthLayout> */}
        // ),
        children:[
          {
            path:"",
            element:<Report/>

          },
          {
            path:"expense-category-pie-chart",
            element:<ExpenseCategoryPieChart/>
          },
          {
            path:"expense-category-to-subcategory-pie-chart",
            element:<ExpenseCategoryToSubCategoryPieChart/>
          },
          {
            path:"income-subcategory-pie-chart",
            element:<IncomeSubCategoryPieChart/>
          },
          {
            path:"payment-mode-distribution-bar-chart",
            element:<PaymentModeDistributionBarChart/>
          },
          {
            path:"income-line-graph",
            element:<IncomeLineGraph/>
          },
          {
            path:"expense-line-graph",
            element:<ExpenseLineGraph/>
          }

        ]
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
