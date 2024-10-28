import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useDeleteBooking() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(
        bookingId
          ? `Booking #${bookingId} deleted succfully`
          : `Booking deleted succfully`
      );
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBooking, isDeletingBooking };
}
