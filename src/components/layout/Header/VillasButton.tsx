import { GoToPageButton } from '~/components/Button/GoToPageButton';

export default function VillasButton() {
  return (
    <GoToPageButton
      path="/villas"
      callToAction="Book Now"
      isWhite={true}
      // target="_blank"
    />
  );
}
