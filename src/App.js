import React from "react";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import Login from "../src/pages/Login.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext.js";
import Notfound from "../src/components/Notfound.js";
import ProtectedRoute from "./middleware/ProtectedRoute/router.js";
import Home from "../src/pages/Home.js";
import { userAuth } from "./context/AuthContext.js";
import { EntryProvider } from "./context/EntryContext.js";
import { AddClupProvider } from "./context/ClupContext.js";
import Profile from "./components/pages/Profile.js";
import { EditContext } from "./context/EditContext.js";
import { Register } from "./context/RegisterContext.js";
import EntryDetail from "./components/pages/EntryDetail.js";
import ProfilDetail from "./components/pages/ProfilDetail.js";
import { AddCommentProvider } from "./context/Comment";
import LandigPage from "./pages/LandigPage";

function App() {
  const { token } = userAuth();

  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          !token ? (
            token ? (
              "Yükleniyor bro"
            ) : (
              <Register>
                <Login />
              </Register>
            )
          ) : (
            <Navigate to="/home" excat />
          )
        }
      />
      <Route
        path="/"
        excat
        element={
          <AddCommentProvider>
            <LandigPage />
          </AddCommentProvider>
        }
      />
      <Route path="*" element={<Notfound />} />
      <Route
        path="/profile/:id"
        element={
          <AddClupProvider>
            <ProfilDetail />
          </AddClupProvider>
        }
        excat
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <EditContext>
              <AddClupProvider>
                <UserProvider>
                  <Profile />
                </UserProvider>
              </AddClupProvider>
            </EditContext>
          </ProtectedRoute>
        }
        exact
      />
      <Route
        path="/entry/:id"
        element={
          <EntryProvider>
            <AddClupProvider>
              <AddCommentProvider>
                <EntryDetail />
              </AddCommentProvider>
            </AddClupProvider>
          </EntryProvider>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <AddClupProvider>
              <EntryProvider>
                <AddCommentProvider>
                  <Home />
                </AddCommentProvider>
              </EntryProvider>
            </AddClupProvider>
          </ProtectedRoute>
        }
        excat
      />
    </Routes>
  );
}

export default App;
