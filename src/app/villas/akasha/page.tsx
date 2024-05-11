import { getCountries } from '~/actions/countries';
import Template from '../_components/Template';
import { akashaId } from '~/lib/villas';

async function Page({
  searchParams,
}: {
  searchParams: { checkin: string; checkout: string };
}) {
  const countries = await getCountries();

  return (
    <Template
      villaId={akashaId}
      checkin={searchParams.checkin}
      checkout={searchParams.checkout}
      countries={countries}
    />
  );
}
export default Page;
