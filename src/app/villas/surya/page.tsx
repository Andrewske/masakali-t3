'use server';
import Template from '../_components/Template';
import { suryaId } from '~/lib/villas';

function Page() {
  return <Template villaId={suryaId} />;
}
export default Page;
