import {
  useState,
  useLayoutEffect,
  type SetStateAction,
  type Dispatch,
} from 'react';

import {
  isBefore,
  isAfter,
  getYear,
  format,
  addYears,
  addDays,
  differenceInCalendarDays,
} from 'date-fns';
import {
  DayPicker,
  type ClassNames,
  type DayPickerSingleProps,
  type Matcher,
  type DateAfter,
  type DateBefore,
} from 'react-day-picker';
import dayPickerStyles from 'react-day-picker/dist/style.css';

import styles from './styles.module.scss';

type DatePickerProps = {
  isRange: boolean;
  date: Date;
  setDate: ({
    type,
    date,
  }: {
    type: 'arrival' | 'departure';
    date: Date;
  }) => void;
  type: 'arrival' | 'departure';
  arrivalDate: Date;
};

const DatePicker = async ({
  date,
  setDate,
  type,
  arrivalDate,
}: DatePickerProps) => {
  const today: Date = new Date();
  const threeYearsFromToday: Date = addYears(today, 3);

  const disabledDates = await getDisabledDates();
  const classNames: ClassNames = {
    ...dayPickerStyles,
    day_disabled: styles.dayPickerDisabled,
    day_selected: styles.dayPickerSelected,
    button: styles.dayPickerButton,
  };

  const parseUTCDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number) as [
      number,
      number,
      number
    ];

    const utcDate = new Date(Date.UTC(year, month - 1, day));

    const offset = utcDate.getTimezoneOffset();

    const adjustedDate = new Date(utcDate.getTime() + offset * 60 * 1000);

    return adjustedDate;
  };

  const matcher = (day: Date) => {
    day = parseUTCDate(format(day, 'yyyy-MM-dd'));
    if (isBefore(day, addDays(arrivalDate, 0))) return true;

    if (type === 'departure') {
      const nextDisabledDate = disabledDates?.slice(0, 1)[0];
      if (nextDisabledDate) {
        isAfter(day, parseUTCDate(nextDisabledDate));
      }
    }

    return disabledDates?.includes(format(day, 'yyyy-MM-dd'));
  };

  const dayPickerProps = {
    className: `${styles.dayPickerRoot ?? ''}`,
    classNames: classNames,
    showOutsideDays: true,
    fixedWeeks: true,
    fromYear: getYear(today),
    toYear: getYear(threeYearsFromToday),
    mode: 'single',
    selected: date,
    onSelect: (day: Date) => setDate({ type, date: day }),
    disabled: matcher,
    required: true,
    //hidden: isPastDate,
  } as DayPickerSingleProps;

  return (
    <div className={styles.wrapper}>
      <DayPicker {...dayPickerProps} />
    </div>
  );
};

export default DatePicker;
