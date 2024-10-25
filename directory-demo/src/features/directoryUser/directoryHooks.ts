"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { directoryKeys } from "./directoryKeys";
import { createUserAction, getAllUsers } from "./directoryUserServerActions";

export const useAllPeopleQuery = () =>
  useQuery({
    queryKey: directoryKeys.allPeople,
    queryFn: async () => await getAllUsers(),
  });

export const useCreatePersonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      first_name,
      last_name,
      email,
    }: {
      first_name: string;
      last_name: string;
      email: string;
    }) => {
      await createUserAction(first_name, last_name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: directoryKeys.allPeople,
      });
    },
  });
};
