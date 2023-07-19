import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

const VillaPage = ({ villaData }: { villaData: { id: string } }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Villa {id}</h1>
      <pre>{JSON.stringify(villaData, null, 2)}</pre>
    </div>
  );
};

export default VillaPage;

export const getStaticProps: GetStaticProps = ({ params }) => {
  const id = params?.id as string;
  //const villaData = await api.smoobu.getVillaData.query({ id: parseInt(id) });

  return {
    props: {
      villaData: { id },
    },
  };
};

/**
 * Retrieves the static paths for the villas.
 *
 * @returns An object containing the paths and fallback value.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  //const villaIds = await (api.smoobu.getActiveVillaIds.useQuery() as Promise<number[]>);
  const { data } = await api.smoobu.getActiveVillaIds.query();

  const villaIds: number[] = data ?? [];
  const paths: { params: { id: string } }[] = villaIds.map((id) => {
    return { params: { id: id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
};
