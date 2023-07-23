import { prisma } from '~/server/db';

export default async function Page() {
  const villas = await prisma.villa.findMany();

  return (
    <>
      {villas.map((villa) => (
        <div key={villa.id}>{villa.name}</div>
      ))}
    </>
  );
}
