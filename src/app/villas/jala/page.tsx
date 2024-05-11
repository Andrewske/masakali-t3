import { getCountries } from '~/actions/countries';
import Template from '../_components/Template';
import { jalaId } from '~/lib/villas';

async function Page({
  searchParams,
}: {
  searchParams: { checkin: string; checkout: string };
}) {
  const countries = await getCountries();

  return (
    <Template
      villaId={jalaId}
      checkin={searchParams.checkin}
      checkout={searchParams.checkout}
      countries={countries}
    />
  );
}
export default Page;
