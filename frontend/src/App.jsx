import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/header/Header";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";
import UserShop from "./pages/UserShop";
import Agronomists from "./pages/Agronomists";
import DashboardWrapper from "./Wrappers/DashboardWrapper";
import EcoShop from "./pages/EcoShop";
import ForumDetailPage from "./pages/ForumDetailPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import Protected from "./pages/Protected";

//CSRF Mechanism
import { csrfTokenURL } from "../utils/Urls";
import { useDispatch } from "react-redux";
import { setToken } from "./store/csrfToken";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch CSRF token from the server
    fetch(csrfTokenURL, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Store the CSRF token
        dispatch(setToken(data.csrfToken));
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []); // Run this effect only once when the component mounts

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecoshop" element={<EcoShop />} />
        <Route path="/ecoshop/:id" element={<ProductDetailPage />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <DashboardWrapper />
            </Protected>
          }
        >
          <Route path="forum" index element={<Dashboard />} />
          <Route path="shop" element={<UserShop />} />
        </Route>
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumDetailPage />} />
        <Route path="/agronomists" element={<Agronomists />} />
      </Routes>
    </>
  );
};

export default App;
