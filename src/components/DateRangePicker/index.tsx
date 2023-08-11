import { useState, useRef, type SetStateAction, type Dispatch } from 'react';
import styles from './styles.module.scss';
import dayPickerStyles from 'react-day-picker/dist/style.module.css';

import { DayPicker, type DateRange, type ClassNames } from 'react-day-picker';
import { addDays } from 'date-fns';
import useOnClickOutside from '~/hooks/useOnClickOutside';

const today = new Date();

type DateRangePickerProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  villaName?: string;
};

const DateRangePicker = ({
  isActive,
  setIsActive,
  villaName,
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

  const disabledDays = [
    addDays(today, 2),
    addDays(today, 4),
    { from: addDays(today, 7), to: addDays(today, 9) },
  ];

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
          disabled={disabledDays}
        />
      </span>
    </div>
  );
};

export default DateRangePicker;
