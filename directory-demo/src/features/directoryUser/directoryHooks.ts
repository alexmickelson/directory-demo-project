"use client"
import { useQuery } from "@tanstack/react-query";
import { directoryKeys } from "./directoryKeys";
import { getAllUsers } from "./directoryUserServerActions";

export const useAllPeopleQuery = () =>
  useQuery({
    queryKey: directoryKeys.allPeople,
    queryFn: async () => await getAllUsers(),
  });
