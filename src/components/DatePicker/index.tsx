import {
  useState,
  useLayoutEffect,
  type SetStateAction,
  type Dispatch,
} from 'react';

import { getYear, addDays, addYears, differenceInCalendarDays } from 'date-fns';
import {
  DayPicker,
  type ClassNames,
  type DateRange,
  type DayPickerSingleProps,
  type DayPickerRangeProps,
  type Matcher,
} from 'react-day-picker';
import dayPickerStyles from 'react-day-picker/dist/style.css';

import styles from './styles.module.scss';

type DatePickerProps = {
  isRange: boolean;
  date: DateRange | Date;
  setDate: Dispatch<SetStateAction<DateRange>> | Dispatch<SetStateAction<Date>>;
  disabled: Matcher;
};

const DatePicker = ({ isRange, date, setDate, disabled }: DatePickerProps) => {
  const today: Date = new Date();
  const threeYearsFromToday: Date = addYears(today, 3);

  // const [selectedDate, setSelectedDate] = useState<Date>(today);

  const [disabledDates, setDisabledDates] = useState<Matcher>([]);

  useLayoutEffect(() => {
    if (disabled) {
      setDisabledDates(disabled);
    }
  }, [disabled]);

  const defaultSelected: DateRange = {
    from: today,
    to: addDays(today, 4),
  };
  const [selectedRange, setSelectedRange] =
    useState<DateRange>(defaultSelected);

  const classNames: ClassNames = {
    ...dayPickerStyles,
    day_disabled: styles.dayPickerDisabled,
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
      selected: date,
      onSelect: setDate,
      hidden: isPastDate,
      disabled: disabled,
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
      selected: date,
      onSelect: setDate,
      disabled: disabled,
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
