"use client";
import Link from "next/link";
import { useAllPeopleQuery } from "./directoryHooks";
import { Spinner } from "@/components/Spinner";

export default function UsersList() {
  const peopleQuery = useAllPeopleQuery();
  return (
    <div className="flex flex-col">
      {peopleQuery.isLoading && <Spinner />}
      {peopleQuery.data?.map((u) => (
        <Link
          key={u.id}
          href={`/person/${u.id}`}
          className="my-3 hover:text-gray-50 hover:scale-105 transition-all"
        >
          {u.first_name} {u.last_name}
        </Link>
      ))}
    </div>
  );
}
