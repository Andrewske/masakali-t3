import { GoToPageButton } from '~/components/Button/GoToPageButton';

export default function RetreatButton() {
  return (
    <GoToPageButton
      path="#contact-form"
      callToAction="Book Retreat"
      isWhite={true}
    />
  );
}
