import { useState } from 'react';

import { getYear, addDays, addYears, differenceInCalendarDays } from 'date-fns';
import {
  DayPicker,
  type ClassNames,
  type DateRange,
  type DayPickerSingleProps,
  type DayPickerRangeProps,
} from 'react-day-picker';
import dayPickerStyles from 'react-day-picker/dist/style.css';

import styles from './styles.module.scss';

const DatePicker = ({ isRange }: { isRange: boolean }) => {
  const today: Date = new Date();
  const threeYearsFromToday: Date = addYears(today, 3);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const defaultSelected: DateRange = {
    from: today,
    to: addDays(today, 4),
  };
  const [selectedRange, setSelectedRange] =
    useState<DateRange>(defaultSelected);

  const classNames: ClassNames = {
    ...dayPickerStyles,
    day_selected: styles.dayPickerSelected,
    button: styles.dayPickerButton,
  };

  const isPastDate = (date: Date) => {
    return differenceInCalendarDays(date, new Date()) < 0;
  };

  let dayPickerProps;

  if (isRange) {
    dayPickerProps = {
      className: `${styles.dayPickerRoot ?? ''}`,
      showOutsideDays: true,
      fixedWeeks: true,
      fromYear: getYear(today),
      toYear: getYear(threeYearsFromToday),
      mode: 'range',
      selected: selectedRange,
      onSelect: setSelectedRange,
      hidden: isPastDate,
      //disabled: disabledDays,
    } as DayPickerRangeProps;
  } else {
    dayPickerProps = {
      className: `${styles.dayPickerRoot ?? ''}`,
      classNames: classNames,
      showOutsideDays: true,
      fixedWeeks: true,
      fromYear: getYear(today),
      toYear: getYear(threeYearsFromToday),
      mode: 'single',
      selected: selectedDate,
      onSelect: setSelectedDate,
      //disabled: disabledDays,
      hidden: isPastDate,
    } as DayPickerSingleProps;
  }

  return (
    <div className={styles.wrapper}>
      <DayPicker {...dayPickerProps} />
    </div>
  );
};

export default DatePicker;
