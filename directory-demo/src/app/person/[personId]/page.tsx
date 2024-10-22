import { postgresService } from "@/services/postgresService";
import React from "react";

export default async function Page({
  params: { personId },
}: {
  params: { personId: string };
}) {
  console.log(personId);
  const users = await postgresService.getAllUsers();
  const person = users.find((u) => u.id === parseInt(personId));
  if (!person) return <div>no person found</div>;
  return (
    <div>
      {person.first_name} {person.last_name}
    </div>
  );
}
