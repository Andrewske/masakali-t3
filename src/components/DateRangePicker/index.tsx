'use client';
import { useRef, type SetStateAction, type Dispatch } from 'react';
import styles from './styles.module.scss';
import dayPickerStyles from 'react-day-picker/dist/style.module.css';
import { addDays, isBefore } from 'date-fns';
import { DayPicker, type DateRange, type ClassNames } from 'react-day-picker';

import useOnClickOutside from '~/hooks/useOnClickOutside';
import { getCurrentDateInBali } from '~/utils';

const today = getCurrentDateInBali();
console.log({ today });

type DateRangePickerProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disabledDates: Date[];
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
};

const DateRangePicker = ({
  isActive,
  setIsActive,
  disabledDates,
  range,
  setRange,
}: DateRangePickerProps) => {
  const dayPickerRef = useRef(null);
  useOnClickOutside(dayPickerRef, () => setIsActive(false));

  const classNames: ClassNames = {
    ...dayPickerStyles,
    day_selected: `${dayPickerStyles.day_selected} ${
      styles.dayPickerSelected ?? ''
    }`,
  };

  const isDateInRange = (
    date: Date,
    start: Date | undefined,
    end: Date | undefined
  ): boolean => {
    return (start && date >= start && end && date <= end) ?? false;
  };

  const rangeIncludesDisabledDate = (
    range: DateRange | undefined,
    disabledDates: Date[]
  ): boolean => {
    if (!range) return false;
    const { from, to } = range;
    return disabledDates.some((date) => isDateInRange(date, from, to));
  };

  const handleSelect = (newRange: DateRange | undefined) => {
    if (!rangeIncludesDisabledDate(newRange, disabledDates)) {
      setRange(newRange);
    } else {
      setRange({
        from: undefined,
        to: undefined,
      });
    }
  };

  return (
    <div
      className={`${styles.wrapper ?? ''} ${
        isActive ? styles.active ?? '' : ''
      }`}
    >
      <span ref={dayPickerRef}>
        <DayPicker
          id="date-range-picker"
          mode="range"
          defaultMonth={today}
          selected={range}
          onSelect={handleSelect}
          classNames={classNames}
          disabled={disabledDates}
          hidden={(day) => isBefore(day, addDays(today, -1))}
          min={2}
        />
      </span>
    </div>
  );
};
export default DateRangePicker;
