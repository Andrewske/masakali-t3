import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';

import { api } from '~/utils/api';

export const getStaticPaths: GetStaticPaths = () => {
  const { data: paths }: { data?: number[] } =
    api.smoobu.getActiveVillaIds.useQuery();

  const parsedPaths = paths?.map(String);

  return { paths: parsedPaths ?? [], fallback: false };
};

export const getStaticProps = (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const helpers = context;
};

// export const Villa = () => {};
