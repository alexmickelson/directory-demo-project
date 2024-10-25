"use client";

import { MyUser } from "@/features/auth/myUserModel";
import { useAuth } from "react-oidc-context";

export default function Header({ user }: { user?: MyUser }) {
  const auth = useAuth();

  console.log("header user", user);
  return (
    <div className="bg-emerald-900">
      {user && (
        <div>
          server side: {user.name}, client side:{" "}
          {auth.user?.profile.preferred_username}
        </div>
      )}
      {!user && <button onClick={() => auth.signinRedirect()}>Login</button>}
      {user && (
        <button
          onClick={() => {
            console.log("deleting cookie");
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            auth.signoutRedirect();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
