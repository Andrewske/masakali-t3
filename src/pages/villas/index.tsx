import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { prisma } from '~/server/db';

import Header from '~/components/Header';

type VillaType = {
  id: number;
  name: string;
  description: string;
};
const Villas = ({ villas }: { villas: VillaType[] }) => {
  return (
    <>
      <Head>
        <title>Masakali Villas</title>
      </Head>

      <main>
        <Header />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const villas = await prisma.villa.findMany();

  return {
    props: {
      villas,
    },
  };
};

export default Villas;
