"use client";
import { ReactNode } from "react";
import { useAuth } from "react-oidc-context";

export function ClientAuthUtils({ children }: { children: ReactNode }) {
  const auth = useAuth();
  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }
  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error)
    return <div>Authentication Error... {auth.error.message}</div>;

  return <>{children}</>;
}
