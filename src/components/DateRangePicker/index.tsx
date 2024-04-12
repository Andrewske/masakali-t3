'use client';
import { useRef, type SetStateAction, type Dispatch } from 'react';
import styles from './styles.module.scss';

import { addDays, isBefore, format } from 'date-fns';
import { DayPicker, type DateRange } from 'react-day-picker';

import useOnClickOutside from '~/hooks/useOnClickOutside';
import { getCurrentDateInBali } from '~/utils';
import { useReservationStore } from '~/providers/ReservationStoreProvider';

const today = getCurrentDateInBali();

type DateRangePickerProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disabledDates: Set<string | undefined>;
};

const DateRangePicker = ({
  isActive,
  setIsActive,
  disabledDates,
}: DateRangePickerProps) => {
  const dayPickerRef = useRef(null);
  useOnClickOutside(dayPickerRef, () => setIsActive(false));
  const { dateRange, setDateRange } = useReservationStore((state) => state);

  const isDateInRange = (
    date: Date,
    start: Date | undefined,
    end: Date | undefined
  ): boolean => {
    return (start && date >= start && end && date <= end) ?? false;
  };

  const rangeIncludesDisabledDate = (
    range: DateRange | undefined,
    disabledDates: Set<string | undefined>
  ): boolean => {
    if (!range) return false;
    const { from, to } = range;

    return [...disabledDates].some(
      (date) => date && isDateInRange(new Date(date), from, to)
    );
  };


  const handleSelect = (newRange: DateRange | undefined) => {
    // Check if the new range is undefined or if either the start or end date is missing
    if (!newRange?.from || !newRange?.to) {
       // Update the date range with the new range's start and end dates, or undefined if not present
       setDateRange({ from: newRange?.from, to: newRange?.to });
       return;
    }
   
    // Check if the start and end dates of the new range are the same
    if (newRange.from.getTime() === newRange.to.getTime()) {
       // If they are the same, update the date range with the start date and set the end date to undefined
       setDateRange({ from: newRange.from, to: undefined });
       return; 
    }
   
    // Check if the new range includes any disabled dates
    if (rangeIncludesDisabledDate(newRange, disabledDates)) {
       // Determine the new start date based on whether the current start date is the same as the new range's start date
       const newFromDate =
         dateRange.from === newRange.from
           ? newRange.to // If the current start date is the same as the new range's start date, use the new range's end date
           : new Date(Math.min(newRange.from.getTime(), newRange.to.getTime())); // Otherwise, use the earliest date between the new range's start and end dates
       // Update the date range with the new start date and set the end date to undefined
       setDateRange({ from: newFromDate, to: undefined });
       return; 
    }
   
    // If none of the above conditions are met, update the date range with the new range
    setDateRange(newRange);
   };
  const isDayDisabled = (day: Date) => {
    return disabledDates.has(format(day, 'yyyy-MM-dd'));
  };

  return (
    <div
      className={` {
        absolute top-0 left-0 right-0 bottom-0 overflow-hidden transform -translate-x-full transition-transform duration-300 ease-in-out bg-[rgba(243,243,243,0.9)] grid place-items-center z-40 ${
          isActive ? 'transform translate-x-0' : ''
        }`}
    >
      <div ref={dayPickerRef}>
        <DayPicker
          id="date-range-picker"
          mode="range"
          defaultMonth={today}
          selected={dateRange}
          onSelect={handleSelect}
          classNames={styles}
          disabled={isDayDisabled}
          hidden={(day) => isBefore(day, addDays(today, -1))}
          min={2}
        />
      </div>
    </div>
  );
};
export default DateRangePicker;
