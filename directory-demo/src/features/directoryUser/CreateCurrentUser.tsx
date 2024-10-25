"use client";
import React from "react";
import { DirectoryUser } from "./directoryUser";
import { useAuth } from "react-oidc-context";
import { createUserAction } from "./directoryUserServerActions";

export default function CreateCurrentUser({
  users,
}: {
  users: DirectoryUser[];
}) {
  const auth = useAuth();

  if (!auth.isAuthenticated) return <></>;

  const username = auth.user?.profile.email ?? "";

  const allEmails = users.map((u) => u.email);

  const userIsInDirectory = allEmails.includes(username);

  if (userIsInDirectory) return <></>;

  return (
    <div>
      {auth.user && (
        <button
          onClick={() => {
            console.log(auth.user?.profile);
            createUserAction(
              auth.user?.profile.given_name ?? "",
              auth.user?.profile.family_name ?? "",
              auth.user?.profile.email ?? ""
            );
          }}
        >
          Create current user
        </button>
      )}
    </div>
  );
}
