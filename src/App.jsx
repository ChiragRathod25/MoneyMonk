import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./Slices/authSlice";
import transactionService from "./appwrite/transactionServices";

function App() {
  console.log("App.jsx loaded");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const creatingTransactions = async (userId) => {
    const data = [
      {
        name: "Groceries",
        $id: "67e864190011fbbb578b",
        $createdAt: "2025-03-29T21:20:26.341+00:00",
        $updatedAt: "2025-03-29T21:20:26.341+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Food & Drinks",
          type: "Expense",
          $id: "67e85916001c32ab73f4",
          $createdAt: "2025-03-29T20:33:27.260+00:00",
          $updatedAt: "2025-03-29T20:33:27.260+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Restaurants",
        $id: "67e8644400215ab9cc97",
        $createdAt: "2025-03-29T21:21:09.581+00:00",
        $updatedAt: "2025-03-29T21:21:09.581+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Food & Drinks",
          type: "Expense",
          $id: "67e85916001c32ab73f4",
          $createdAt: "2025-03-29T20:33:27.260+00:00",
          $updatedAt: "2025-03-29T20:33:27.260+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Delivery",
        $id: "67e864670038c0d24a6d",
        $createdAt: "2025-03-29T21:21:45.036+00:00",
        $updatedAt: "2025-03-29T21:21:45.036+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Food & Drinks",
          type: "Expense",
          $id: "67e85916001c32ab73f4",
          $createdAt: "2025-03-29T20:33:27.260+00:00",
          $updatedAt: "2025-03-29T20:33:27.260+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Clothing",
        $id: "67e86475001fcec9fdf8",
        $createdAt: "2025-03-29T21:21:58.579+00:00",
        $updatedAt: "2025-03-29T21:21:58.579+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Shopping",
          type: "Expense",
          $id: "67e859230032ac787f4f",
          $createdAt: "2025-03-29T20:33:40.547+00:00",
          $updatedAt: "2025-03-29T20:33:40.547+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Electronics",
        $id: "67e8647c003b42dd4e8b",
        $createdAt: "2025-03-29T21:22:06.017+00:00",
        $updatedAt: "2025-03-29T21:22:06.017+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Shopping",
          type: "Expense",
          $id: "67e859230032ac787f4f",
          $createdAt: "2025-03-29T20:33:40.547+00:00",
          $updatedAt: "2025-03-29T20:33:40.547+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Gifts",
        $id: "67e86481002e51159781",
        $createdAt: "2025-03-29T21:22:10.550+00:00",
        $updatedAt: "2025-03-29T21:22:10.550+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Shopping",
          type: "Expense",
          $id: "67e859230032ac787f4f",
          $createdAt: "2025-03-29T20:33:40.547+00:00",
          $updatedAt: "2025-03-29T20:33:40.547+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Kids",
        $id: "67e8648700014123731f",
        $createdAt: "2025-03-29T21:22:16.117+00:00",
        $updatedAt: "2025-03-29T21:22:16.117+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Shopping",
          type: "Expense",
          $id: "67e859230032ac787f4f",
          $createdAt: "2025-03-29T20:33:40.547+00:00",
          $updatedAt: "2025-03-29T20:33:40.547+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Pets",
        $id: "67e8648c0037c57cea6b",
        $createdAt: "2025-03-29T21:22:21.937+00:00",
        $updatedAt: "2025-03-29T21:22:21.937+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Shopping",
          type: "Expense",
          $id: "67e859230032ac787f4f",
          $createdAt: "2025-03-29T20:33:40.547+00:00",
          $updatedAt: "2025-03-29T20:33:40.547+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Utilities",
        $id: "67e86495001bc4b2074b",
        $createdAt: "2025-03-29T21:22:30.512+00:00",
        $updatedAt: "2025-03-29T21:22:30.512+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Housing",
          type: "Expense",
          $id: "67e859310003a31f59c0",
          $createdAt: "2025-03-29T20:33:53.821+00:00",
          $updatedAt: "2025-03-29T20:33:53.821+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Mortgage",
        $id: "67e8649a0011525d9173",
        $createdAt: "2025-03-29T21:22:35.102+00:00",
        $updatedAt: "2025-03-29T21:22:35.102+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Housing",
          type: "Expense",
          $id: "67e859310003a31f59c0",
          $createdAt: "2025-03-29T20:33:53.821+00:00",
          $updatedAt: "2025-03-29T20:33:53.821+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Rent",
        $id: "67e8649f000659f10371",
        $createdAt: "2025-03-29T21:22:40.173+00:00",
        $updatedAt: "2025-03-29T21:22:40.173+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Housing",
          type: "Expense",
          $id: "67e859310003a31f59c0",
          $createdAt: "2025-03-29T20:33:53.821+00:00",
          $updatedAt: "2025-03-29T20:33:53.821+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Maintenance",
        $id: "67e864a400394e327bfa",
        $createdAt: "2025-03-29T21:22:45.996+00:00",
        $updatedAt: "2025-03-29T21:22:45.996+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Housing",
          type: "Expense",
          $id: "67e859310003a31f59c0",
          $createdAt: "2025-03-29T20:33:53.821+00:00",
          $updatedAt: "2025-03-29T20:33:53.821+00:00",
          $permissions: [],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Phone",
        $id: "67e864b6000ecb9d5d69",
        $createdAt: "2025-03-29T21:23:03.343+00:00",
        $updatedAt: "2025-03-29T21:23:03.343+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Bills",
          type: "Expense",
          $id: "67e861cf001f6bb163d0",
          $createdAt: "2025-03-29T21:10:40.531+00:00",
          $updatedAt: "2025-03-29T21:10:40.531+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Internet",
        $id: "67e864bb000ddfc8fde9",
        $createdAt: "2025-03-29T21:23:08.050+00:00",
        $updatedAt: "2025-03-29T21:23:08.050+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Bills",
          type: "Expense",
          $id: "67e861cf001f6bb163d0",
          $createdAt: "2025-03-29T21:10:40.531+00:00",
          $updatedAt: "2025-03-29T21:10:40.531+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Subscriptions",
        $id: "67e864c10011cec3f1b9",
        $createdAt: "2025-03-29T21:23:14.305+00:00",
        $updatedAt: "2025-03-29T21:23:14.305+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Bills",
          type: "Expense",
          $id: "67e861cf001f6bb163d0",
          $createdAt: "2025-03-29T21:10:40.531+00:00",
          $updatedAt: "2025-03-29T21:10:40.531+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Healthcare",
        $id: "67e864c700254006dbd9",
        $createdAt: "2025-03-29T21:23:20.639+00:00",
        $updatedAt: "2025-03-29T21:23:20.639+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Bills",
          type: "Expense",
          $id: "67e861cf001f6bb163d0",
          $createdAt: "2025-03-29T21:10:40.531+00:00",
          $updatedAt: "2025-03-29T21:10:40.531+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Taxes",
        $id: "67e864cc001dc1230543",
        $createdAt: "2025-03-29T21:23:25.267+00:00",
        $updatedAt: "2025-03-29T21:23:25.267+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Bills",
          type: "Expense",
          $id: "67e861cf001f6bb163d0",
          $createdAt: "2025-03-29T21:10:40.531+00:00",
          $updatedAt: "2025-03-29T21:10:40.531+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Public",
        $id: "67e864d400008d207c39",
        $createdAt: "2025-03-29T21:23:33.066+00:00",
        $updatedAt: "2025-03-29T21:23:33.066+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Transport",
          type: "Expense",
          $id: "67e861dc0003579c8bb0",
          $createdAt: "2025-03-29T21:10:53.091+00:00",
          $updatedAt: "2025-03-29T21:10:53.091+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Taxi",
        $id: "67e864d8002f4c45d886",
        $createdAt: "2025-03-29T21:23:37.609+00:00",
        $updatedAt: "2025-03-29T21:23:37.609+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Transport",
          type: "Expense",
          $id: "67e861dc0003579c8bb0",
          $createdAt: "2025-03-29T21:10:53.091+00:00",
          $updatedAt: "2025-03-29T21:10:53.091+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Long Distance",
        $id: "67e864dd000455b0c69d",
        $createdAt: "2025-03-29T21:23:42.138+00:00",
        $updatedAt: "2025-03-29T21:23:42.138+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Transport",
          type: "Expense",
          $id: "67e861dc0003579c8bb0",
          $createdAt: "2025-03-29T21:10:53.091+00:00",
          $updatedAt: "2025-03-29T21:10:53.091+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Fuel",
        $id: "67e864e3003acba0222c",
        $createdAt: "2025-03-29T21:23:48.997+00:00",
        $updatedAt: "2025-03-29T21:23:48.997+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Vehicle",
          type: "Expense",
          $id: "67e861e30009b740a41a",
          $createdAt: "2025-03-29T21:11:00.169+00:00",
          $updatedAt: "2025-03-29T21:11:00.169+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Parking",
        $id: "67e864ea001e4b400a24",
        $createdAt: "2025-03-29T21:23:55.552+00:00",
        $updatedAt: "2025-03-29T21:23:55.552+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Vehicle",
          type: "Expense",
          $id: "67e861e30009b740a41a",
          $createdAt: "2025-03-29T21:11:00.169+00:00",
          $updatedAt: "2025-03-29T21:11:00.169+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Maintenance",
        $id: "67e864f20022c9b98ffe",
        $createdAt: "2025-03-29T21:24:03.647+00:00",
        $updatedAt: "2025-03-29T21:24:03.647+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Vehicle",
          type: "Expense",
          $id: "67e861e30009b740a41a",
          $createdAt: "2025-03-29T21:11:00.169+00:00",
          $updatedAt: "2025-03-29T21:11:00.169+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Insurance",
        $id: "67e864f900134c84bd37",
        $createdAt: "2025-03-29T21:24:10.392+00:00",
        $updatedAt: "2025-03-29T21:24:10.392+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Vehicle",
          type: "Expense",
          $id: "67e861e30009b740a41a",
          $createdAt: "2025-03-29T21:11:00.169+00:00",
          $updatedAt: "2025-03-29T21:11:00.169+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Entertainment",
        $id: "67e865000023c80faa35",
        $createdAt: "2025-03-29T21:24:17.675+00:00",
        $updatedAt: "2025-03-29T21:24:17.675+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Leisure",
          type: "Expense",
          $id: "67e861e9000933cdcbb9",
          $createdAt: "2025-03-29T21:11:06.196+00:00",
          $updatedAt: "2025-03-29T21:11:06.196+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Sports",
        $id: "67e86506002bd7deaadc",
        $createdAt: "2025-03-29T21:24:23.760+00:00",
        $updatedAt: "2025-03-29T21:24:23.760+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Leisure",
          type: "Expense",
          $id: "67e861e9000933cdcbb9",
          $createdAt: "2025-03-29T21:11:06.196+00:00",
          $updatedAt: "2025-03-29T21:11:06.196+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Hobbies",
        $id: "67e8650c001eccb82a67",
        $createdAt: "2025-03-29T21:24:29.548+00:00",
        $updatedAt: "2025-03-29T21:24:29.548+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Leisure",
          type: "Expense",
          $id: "67e861e9000933cdcbb9",
          $createdAt: "2025-03-29T21:11:06.196+00:00",
          $updatedAt: "2025-03-29T21:11:06.196+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Vacations",
        $id: "67e865110018d98d6fcd",
        $createdAt: "2025-03-29T21:24:34.228+00:00",
        $updatedAt: "2025-03-29T21:24:34.228+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Leisure",
          type: "Expense",
          $id: "67e861e9000933cdcbb9",
          $createdAt: "2025-03-29T21:11:06.196+00:00",
          $updatedAt: "2025-03-29T21:11:06.196+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Salary",
        $id: "67e8651b002c420bc4b8",
        $createdAt: "2025-03-29T21:24:44.868+00:00",
        $updatedAt: "2025-03-29T21:24:44.868+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Income",
          type: "Income",
          $id: "67e861f10011bae4b858",
          $createdAt: "2025-03-29T21:11:14.663+00:00",
          $updatedAt: "2025-03-29T21:11:14.663+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Equities",
        $id: "67e865200003f058f7e7",
        $createdAt: "2025-03-29T21:24:48.875+00:00",
        $updatedAt: "2025-03-29T21:24:48.875+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Income",
          type: "Income",
          $id: "67e861f10011bae4b858",
          $createdAt: "2025-03-29T21:11:14.663+00:00",
          $updatedAt: "2025-03-29T21:11:14.663+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Personal Savings",
        $id: "67e86526000aeed9255e",
        $createdAt: "2025-03-29T21:24:55.283+00:00",
        $updatedAt: "2025-03-29T21:24:55.283+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Income",
          type: "Income",
          $id: "67e861f10011bae4b858",
          $createdAt: "2025-03-29T21:11:14.663+00:00",
          $updatedAt: "2025-03-29T21:11:14.663+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Rents and Royalties",
        $id: "67e8652c0024d422c62e",
        $createdAt: "2025-03-29T21:25:01.649+00:00",
        $updatedAt: "2025-03-29T21:25:01.649+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Income",
          type: "Income",
          $id: "67e861f10011bae4b858",
          $createdAt: "2025-03-29T21:11:14.663+00:00",
          $updatedAt: "2025-03-29T21:11:14.663+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Part-time Work",
        $id: "67e865310015cf909130",
        $createdAt: "2025-03-29T21:25:06.154+00:00",
        $updatedAt: "2025-03-29T21:25:06.154+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Income",
          type: "Income",
          $id: "67e861f10011bae4b858",
          $createdAt: "2025-03-29T21:11:14.663+00:00",
          $updatedAt: "2025-03-29T21:11:14.663+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Pensions",
        $id: "67e865360027432aa9d1",
        $createdAt: "2025-03-29T21:25:11.731+00:00",
        $updatedAt: "2025-03-29T21:25:11.731+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Income",
          type: "Income",
          $id: "67e861f10011bae4b858",
          $createdAt: "2025-03-29T21:11:14.663+00:00",
          $updatedAt: "2025-03-29T21:11:14.663+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
      {
        name: "Account Transfer",
        $id: "67e8653d0010c903b785",
        $createdAt: "2025-03-29T21:25:18.356+00:00",
        $updatedAt: "2025-03-29T21:25:18.356+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        categoryId: {
          name: "Income",
          type: "Income",
          $id: "67e861f10011bae4b858",
          $createdAt: "2025-03-29T21:11:14.663+00:00",
          $updatedAt: "2025-03-29T21:11:14.663+00:00",
          $permissions: [
            'read("user:67acf920002237a66814")',
            'update("user:67acf920002237a66814")',
            'delete("user:67acf920002237a66814")',
          ],
          $databaseId: "67ac4b0a0032657280de",
          $collectionId: "67c0519a003434478ba0",
        },
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051c4001c5a723b37",
      },
    ];

    const payment = [
      {
        name: "Cash",
        $id: "67e8e28900208257a652",
        $createdAt: "2025-03-30T06:19:54.201+00:00",
        $updatedAt: "2025-03-30T06:19:54.201+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Credit Card",
        $id: "67e8e2a4002a2dbad5af",
        $createdAt: "2025-03-30T06:20:23.871+00:00",
        $updatedAt: "2025-03-30T06:20:23.871+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Debit Card",
        $id: "67e8e2ae0024d465c7e6",
        $createdAt: "2025-03-30T06:20:31.186+00:00",
        $updatedAt: "2025-03-30T06:20:31.186+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "UPI",
        $id: "67e8e2b4003d2c6ea093",
        $createdAt: "2025-03-30T06:20:37.543+00:00",
        $updatedAt: "2025-03-30T06:20:37.543+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Bank Transfer",
        $id: "67e8e2bb001318236ca0",
        $createdAt: "2025-03-30T06:20:43.880+00:00",
        $updatedAt: "2025-03-30T06:20:43.880+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Wallet",
        $id: "67e8e2c200049241d03f",
        $createdAt: "2025-03-30T06:20:50.760+00:00",
        $updatedAt: "2025-03-30T06:20:50.760+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Cheque",
        $id: "67e8e2c7001b4fe79d88",
        $createdAt: "2025-03-30T06:20:56.080+00:00",
        $updatedAt: "2025-03-30T06:20:56.080+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Cryptocurrency",
        $id: "67e8e2ce0036c39908db",
        $createdAt: "2025-03-30T06:21:03.463+00:00",
        $updatedAt: "2025-03-30T06:21:03.463+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Gift Card",
        $id: "67e8e2d5002f608c90a0",
        $createdAt: "2025-03-30T06:21:10.314+00:00",
        $updatedAt: "2025-03-30T06:21:10.314+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
      {
        name: "Other",
        $id: "67e8e2db0010f9ebe453",
        $createdAt: "2025-03-30T06:21:15.844+00:00",
        $updatedAt: "2025-03-30T06:21:15.844+00:00",
        $permissions: [
          'read("user:67acf920002237a66814")',
          'update("user:67acf920002237a66814")',
          'delete("user:67acf920002237a66814")',
        ],
        $databaseId: "67ac4b0a0032657280de",
        $collectionId: "67c051b400122f18fe99",
      },
    ];

    let list = {};
    for (const cat of data) {
      const category = cat.categoryId.$id;
      const subCategory = cat.$id;
      if (!list[category]) {
        list[category] = [];
      }
      list[category].push(subCategory);
    }
    console.log("list", list);

    const paymentModes = [];
    for (const pay of payment) {
      const paymentMode = pay.$id;
      paymentModes.push(paymentMode);
    }
    console.log("paymentModes", paymentModes);

    const availableStatus = ["Pending", "Completed", "Failed"];

    const createTransactions = async (n) => {
      for (let i = 0; i < n; i++) {
        // select random amount between 1000 to 10000
        const amount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        const type = "Expense"; // or "Income"
        const status =
          availableStatus[Math.floor(Math.random() * availableStatus.length)];
        const description = "Transaction description";

        // select random date between 2025-01-01 and 2025-12-31
        const date = new Date(
          2025,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 31)
        )
          .toISOString()
          .split("T")[0];

        // select any one categoryId from the list
        const categoryIds = Object.keys(list);
        const categoryId= categoryIds[Math.floor(Math.random() * categoryIds.length)];
        console.log("Selected categoryId", categoryId);
        const availableSubCategory = list[categoryId];
        console.log("availableSubCategory", availableSubCategory);
        const subCategoryId =
          availableSubCategory[
            Math.floor(Math.random() * availableSubCategory.length)
          ];
        const paymentMode =
          paymentModes[Math.floor(Math.random() * paymentModes.length)];

        const data = {
          amount,
          type,
          status,
          description,
          date,
          categoryId:categoryId,
          subcategoryId:subCategoryId,
          paymentModeId:paymentMode,
        };
        console.log(data);

         await transactionService
          .createTrasanction(data,userId)
          .then((response) => {
            console.log(i,"Transaction created successfully:", response);
          })
          .catch((error) => {
            console.error("Error creating transaction:", error);
          });
      }
    };
    createTransactions(25);
  };

  useEffect(() => {
    setError("");
    setLoading(false);
    try {
      setLoading(true);
      authService.getCurrentUser().then((response) => {
        if (response) {
          console.log("App.jsx current user response", response);
          dispatch(login(response));
          // creatingTransactions(response.$id); 
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
