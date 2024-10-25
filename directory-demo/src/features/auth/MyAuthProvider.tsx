"use client";

import { WebStorageStateStore } from "oidc-client-ts";
import { ReactNode } from "react";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";

const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "alex-in-class",
  redirect_uri: "http://localhost:3001/",
  post_logout_redirect_uri: "http://localhost:3001/",
  // used to remove query string parameters after authentication
  onSigninCallback: (user) => {
    const token = user?.access_token;
    const expiresDate = new Date(0);
    expiresDate.setUTCSeconds(user?.expires_at ?? 0);
    console.log("setting cookie", expiresDate);
    document.cookie = `jwt=${token}; expires=${expiresDate.toUTCString()}; samesite=None;`;

    window.history.replaceState({}, document.title, window.location.pathname);
  },
  matchSignoutCallback: (args) =>
    window && window.location.href === args.post_logout_redirect_uri,
  onSignoutCallback: () => {
    // console.log("deleting cookie");
    // document.cookie =
    //   "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=Strict;";
  },
  userStore:
    typeof window !== "undefined"
      ? new WebStorageStateStore({ store: window.localStorage })
      : undefined,
};

export default function MyAuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider {...oidcConfig}>
      {children}
    </AuthProvider>
  );
}
