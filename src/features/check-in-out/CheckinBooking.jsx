import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckin } = useCheckin();

  const { settings, isLoading: isSettingLoading } = useSettings();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const moveBack = useMoveBack();

  useEffect(() => setIsPaid(booking?.isPaid ?? false), [booking?.isPaid]);

  if (isLoading || isSettingLoading) return <Spinner />;
  const { breakfastPrice } = settings;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking.data;

  const optionalBreakfastPrice = breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!isPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        statusIsPaid: {
          status: "checked-in",
          isPaid: true,
        },
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({
        bookingId,
        breakfast: {},
        statusIsPaid: {
          status: "checked-in",
          isPaid: true,
        },
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking.data} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((breakfast) => !breakfast);
            setIsPaid(false);
          }}
          id="breakfast"
        >
          Want to add breakfast {formatCurrency(optionalBreakfastPrice)}?
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={isPaid}
          onChange={() => setIsPaid((paid) => !paid)}
          disabled={isPaid}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaid || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
