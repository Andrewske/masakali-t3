import { prisma } from '~/app/api/db';
import { api } from '~/utils/api';

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
export default api.withTRPC(Page);
