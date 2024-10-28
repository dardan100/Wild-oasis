import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditCabin } from "../../services/apiCabins";

export default function useCreateCabin() {
  const queryClinet = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });
  return { createCabin, isCreating };
}
