import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewPremise from "./containers/NewPremise";
import NotFound from "./containers/NotFound";
import Premises from "./containers/Premises";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" 
        element={
        <UnauthenticatedRoute>
          <Login />
        </UnauthenticatedRoute>
        }
      />
      <Route path="/signup" 
        element={
            <UnauthenticatedRoute>
                <Signup />
            </UnauthenticatedRoute>
            } 
      />
      <Route path="/premises/new" 
        element={
            <AuthenticatedRoute>
                <NewPremise />
            </AuthenticatedRoute>
            } 
        />
      <Route path="/premises/:id" 
        element={
            <AuthenticatedRoute>
                <Premises /> 
            </AuthenticatedRoute>
            } 
      />
      <Route path="/settings" 
        element={
            <AuthenticatedRoute>
                <Settings />
            </AuthenticatedRoute>
            } 
      />
      {
        /* Finally, catch all unmatched routes */
      }
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}