import * as React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../redux/reducers";

interface AuthGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }: AuthGuardType) {
  const auth = useSelector((state: AppStateType) => state.authReducer);

  if (!auth.user) {
    return <Redirect to="/auth/sign-in" />;
  }

  return children;
}

export default AuthGuard;
