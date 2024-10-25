import CreateCurrentUser from "@/features/directoryUser/CreateCurrentUser";
import { postgresService } from "@/features/directoryUser/postgresService";
// import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  // const cookieStore = cookies();
  // console.log(cookieStore.get("jwt"));

  const users = await postgresService.getAllUsers();
  return (
    <div className="">
      <CreateCurrentUser users={users} />
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          {users.map((u) => (
            <Link
              key={u.id}
              href={`/person/${u.id}`}
              className="my-3 hover:text-gray-50 hover:scale-105 transition-all"
            >
              {u.first_name} {u.last_name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
