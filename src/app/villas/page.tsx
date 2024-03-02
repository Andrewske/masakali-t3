import { prisma } from '~/db/prisma';
//import { api } from '~/utils/api';

// TODO: Add villas cards
async function Page() {
  const villas = await prisma.villa.findMany();

  return (
    <main>
      {villas.map((villa) => (
        <div key={villa.id}>{villa.name}</div>
      ))}
    </main>
  );
}
export default Page;
