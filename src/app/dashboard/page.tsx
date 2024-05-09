'use client';
import styles from './styles.module.scss';

// import { UpdateReservationsButton } from '~/components/Button/UpdateReservations';

// import { getPricing } from '~/actions/smoobu';
// import { suryaId } from '~/lib/villas';

export default function Page() {
  // const handleButtonClick = () => {
  //   // try {
  //   //   const response = await getPricing({
  //   //     villaId: suryaId,
  //   //     checkin: new Date('2023-11-01'),
  //   //     checkout: new Date('2023-11-05'),
  //   //   });
  //   //   console.log(response);
  //   //   return;
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  //   console.log('Button Clicked');
  //   return;
  // };
  return (
    <main className={styles.main}>
      {/* <UpdateReservationsButton /> */}
      {/* <Button
        isWhite={false}
        callToAction={'Click Me'}
        handleClick={handleButtonClick}
      /> */}
    </main>
  );
}
