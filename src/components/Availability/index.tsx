import Button from '../Button';
import styles from './styles.module.scss';
import DatePicker from '../DatePicker';

const Availability = () => {
  const handleCheckAvailability = () => {
    console.log('Check Availability');
  };

  return (
    <section
      id="availability"
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <DatePicker isRange={false} />
        <h3 className={styles.dateTitle}>ARRIVAL DATE</h3>
        <span className={styles.dateContainer}>
          <p className={styles.dateDayLarge}>18</p>
          <span>
            <p>
              May, 2023
              <br />
              Thursday
            </p>
          </span>
        </span>
      </div>
      <div className={styles.container}>
        <h3 className={styles.dateTitle}>DEPARTURE DATE</h3>
        <span className={styles.dateContainer}>
          <span className={styles.dateDayLarge}>18</span>
          <span className={styles.dateInfo}>
            <p>
              May, 2023
              <br />
              Thursday
            </p>
          </span>
        </span>
      </div>
      <div className={styles.container}>
        <Button
          callToAction="check availability"
          handleClick={handleCheckAvailability}
        />
      </div>
    </section>
  );
};

export default Availability;
