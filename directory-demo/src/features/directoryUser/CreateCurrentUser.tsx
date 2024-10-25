"use client";
import React from "react";
import { useAuth } from "react-oidc-context";
import { useAllPeopleQuery, useCreatePersonMutation } from "./directoryHooks";

export default function CreateCurrentUser() {
  const peopleQuery = useAllPeopleQuery();
  const auth = useAuth();
  const createUserMutation = useCreatePersonMutation();

  if (!auth.isAuthenticated) return <></>;

  const username = auth.user?.profile.email ?? "";

  const allEmails = peopleQuery.data?.map((u) => u.email) ?? [];

  const userIsInDirectory = allEmails.includes(username);

  if (userIsInDirectory) return <></>;

  return (
    <div>
      {auth.user && (
        <button
          onClick={() => {
            console.log(auth.user?.profile);
            createUserMutation.mutate({
              first_name: auth.user?.profile.given_name ?? "",
              last_name: auth.user?.profile.family_name ?? "",
              email: auth.user?.profile.email ?? "",
            });
          }}
        >
          Create current user
        </button>
      )}
    </div>
  );
}
