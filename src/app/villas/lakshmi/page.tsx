import Template from '../_components/Template';
import { lakshmiId } from '~/lib/villas';

function Page({
  searchParams,
}: {
  searchParams: { checkIn: string; checkOut: string };
}) {
  const description = 'description';
  const amenities = 'amenities';

  return (
    <Template
      description={description}
      amenities={amenities}
      villaId={lakshmiId}
      checkIn={searchParams.checkIn}
      checkOut={searchParams.checkOut}
    />
  );
}
export default Page;
