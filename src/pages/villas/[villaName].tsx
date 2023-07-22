import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';

import { prisma } from '~/server/db';

const VillaPage = ({ villaData }: { villaData: { name: string } }) => {
  return (
    <div>
      <h1>Villa {villaData?.name}</h1>
      <pre>{JSON.stringify(villaData, null, 2)}</pre>
    </div>
  );
};

export default VillaPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params?.villaName as string;
  const villaData = await prisma.villa.findUnique({
    where: {
      name,
    },
  });

  return {
    props: {
      villaData,
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
  const villas = await prisma.villa.findMany();
  const paths: { params: { villaName: string } }[] = villas.map(({ name }) => {
    return { params: { villaName: name } };
  });

  return {
    paths,
    fallback: true,
  };
};
