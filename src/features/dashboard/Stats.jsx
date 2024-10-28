import React from "react";
import Stat from "./Stat";
import {
  HiCurrencyEuro,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);
  console.log(confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0));

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
        title="Bookings"
      />
      <Stat
        icon={<HiCurrencyEuro />}
        color="green"
        value={formatCurrency(sales)}
        title="Sales"
      />
      <Stat
        icon={<HiOutlineCalendar />}
        color="indigo"
        value={checkins}
        title="Checkins"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
        title="Occupations rate"
      />
    </>
  );
}
