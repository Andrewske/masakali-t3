import Header from '~/components/layout/Header';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isAdmin={true} />

      {children}
    </>
  );
}
