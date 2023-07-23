import { prisma } from '~/server/db';

/**
 * Retrieves the data for a specific villa.
 *
 * @param {object} params - The parameters object.
 * @param {string} params.villaName - The name of the villa.
 * @return {Promise<void>} A promise that resolves when the data is retrieved.
 */
export default async function VillaPage({
  params: { villaName },
}: {
  params: { villaName: string };
}) {
  const villaData = await prisma.villa.findUnique({
    where: {
      name: villaName,
    },
  });

  return (
    <div>
      <h1>Villa {villaData?.name}</h1>
      <pre>{JSON.stringify(villaData, null, 2)}</pre>
    </div>
  );
}
