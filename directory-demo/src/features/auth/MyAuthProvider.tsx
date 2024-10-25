"use client";

import { WebStorageStateStore } from "oidc-client-ts";
import { ReactNode } from "react";
import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import { revalidatePathAfterAuth } from "./revalidatePathAfterAuth";
import { useRouter } from "next/navigation";

export default function MyAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const oidcConfig: AuthProviderProps = {
    authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
    client_id: "alex-in-class",
    redirect_uri: "http://localhost:3001/",
    post_logout_redirect_uri: "http://localhost:3001/",
    // used to remove query string parameters after authentication
    onSigninCallback: async (user) => {
      const token = user?.id_token;
      const expiresDate = new Date(0);
      expiresDate.setUTCSeconds(user?.expires_at ?? 0);
      console.log("setting cookie", expiresDate);
      document.cookie = `jwt=${token}; expires=${expiresDate.toUTCString()};`;

      window.history.replaceState({}, document.title, window.location.pathname);
      await revalidatePathAfterAuth(); // update server components to pass new props to the client
      router.refresh() // have client components receive the new props
    },
    matchSignoutCallback: (args) =>
      window && window.location.href === args.post_logout_redirect_uri,
    onSignoutCallback: () => {
      // console.log("deleting cookie");
      // document.cookie =
      //   "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    },
    userStore:
      typeof window !== "undefined"
        ? new WebStorageStateStore({ store: window.localStorage })
        : undefined,
  };
  return (
    <AuthProvider {...oidcConfig}>
      <ClientAuthUtils>{children}</ClientAuthUtils>
    </AuthProvider>
  );
}

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
