'use client';
import { useEffect, useRef, type SetStateAction, type Dispatch } from 'react';
import styles from './styles.module.scss';
import dayPickerStyles from 'react-day-picker/dist/style.module.css';
import { addDays, isBefore, format, setDate } from 'date-fns';
import { DayPicker, type DateRange, type ClassNames } from 'react-day-picker';

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

  // useEffect(() => {
  //   setDateRange({
  //     from: undefined,
  //     to: undefined,
  //   });
  // }, [disabledDates]);

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
    if (!newRange) return;
    if (!rangeIncludesDisabledDate(newRange, disabledDates)) {
      if (
        newRange?.from &&
        newRange?.to &&
        newRange.from.getTime() === newRange.to.getTime()
      ) {
        newRange.to = undefined;
      }

      console.log('setting date range', newRange);
      console.log('here');

      setDateRange(newRange);
    } else {
      console.log('disabled date', newRange);

      setDateRange({
        from: new Date(),
        to: undefined,
      });
    }
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
