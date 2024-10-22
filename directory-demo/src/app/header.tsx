"use client";

import { useAuth } from "react-oidc-context";

export default function Header({ username }: { username: string }) {
  const auth = useAuth();

  const isLoggedIn = username || auth.isAuthenticated;
  return (
    <div>
      {!isLoggedIn && <button onClick={() => auth.signinRedirect()}>Login</button>}
      {isLoggedIn && <button onClick={() => auth.signoutRedirect()}>Logout</button>}
    </div>
  );
}
