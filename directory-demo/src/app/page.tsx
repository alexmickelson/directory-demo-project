import CreateCurrentUser from "@/features/directoryUser/CreateCurrentUser";
import { postgresService } from "@/features/directoryUser/postgresService";
import UsersList from "../features/directoryUser/UsersList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { directoryKeys } from "@/features/directoryUser/directoryKeys";

export default async function Home() {
  const users = await postgresService.getAllUsers();
  const cache = new QueryClient();

  // await cache.prefetchQuery({
  //   queryKey: directoryKeys.allPeople,
  //   queryFn: () => users,
  // });

  const dehydrated = dehydrate(cache);

  return (
    <div className="">
      <HydrationBoundary state={dehydrated}>
        <CreateCurrentUser />
        <div className="flex flex-row justify-center">
          <UsersList />
        </div>
      </HydrationBoundary>
    </div>
  );
}
