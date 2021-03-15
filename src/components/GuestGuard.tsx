import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../redux/reducers";

interface GuestGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }: GuestGuardType) {
  const auth = useSelector((state: AppStateType) => state.authReducer);

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return children;
}

export default GuestGuard;
