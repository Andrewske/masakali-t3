import Template from '../_components/Template';
import { akashaId } from '~/lib/villas';

function Page({
  searchParams,
}: {
  searchParams: { checkin: string; checkout: string };
}) {
  const description = 'description';
  const amenities = 'amenities';

  return (
    <Template
      description={description}
      amenities={amenities}
      villaId={akashaId}
      checkin={searchParams.checkin}
      checkout={searchParams.checkout}
    />
  );
}
export default Page;
