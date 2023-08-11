'use client';
import { useState, useRef, type SetStateAction, type Dispatch } from 'react';
import styles from './styles.module.scss';
import dayPickerStyles from 'react-day-picker/dist/style.module.css';

import { DayPicker, type DateRange, type ClassNames } from 'react-day-picker';

import useOnClickOutside from '~/hooks/useOnClickOutside';

import { villas, type VillaName } from '~/utils/smoobu';
import { getDatesBetweenDates } from '~/utils';
import { prisma } from '~/app/api/db';

const today = new Date();

type DateRangePickerProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  disabledDates: Date[];
  setDates: Dispatch<SetStateAction<DateRange | undefined>>;
};

const DateRangePicker = ({
  isActive,
  setIsActive,
  disabledDates,
  setDates,
}: DateRangePickerProps) => {
  const defaultSelected: DateRange = {
    from: today,
    to: undefined,
  };

  const dayPickerRef = useRef(null);
  useOnClickOutside(dayPickerRef, () => setIsActive(false));
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const classNames: ClassNames = {
    ...dayPickerStyles,
    // day_disabled:`${dayPickerStyles.day_disabled} ${ styles.dayPickerDisabled ?? ''}`,
    day_selected: `${dayPickerStyles.day_selected} ${
      styles.dayPickerSelected ?? ''
    }`,
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
          onSelect={setRange}
          classNames={classNames}
          disabled={disabledDates}
        />
      </span>
    </div>
  );
};

export default DateRangePicker;
