import { prisma } from '~/app/api/db';

export default async function Page() {
  const villas = await prisma.villa.findMany();

  return (
    <main>
      {villas.map((villa) => (
        <div key={villa.id}>{villa.name}</div>
      ))}
    </main>
  );
}
