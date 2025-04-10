import LinkWithUnderline from '~/components/LinkWithUnderline';

const HeaderLinks = ({ isAdmin }: { isAdmin?: boolean }) => {
  const mainLinks = [
    { name: 'Home', href: `/` },
    { name: 'Villas', href: `/villas` },
    { name: 'Experience', href: `/experience` },
    { name: 'Yoga', href: `/yoga` },
    { name: 'Retreats', href: `/retreats` },
  ];

  const adminLinks = [
    { name: 'Dashboard', href: `/admin` },
    { name: 'Invoices', href: `/admin/xendit/invoices` },
    { name: 'Confirmation Email', href: `/admin/email/send_confirmation` },
  ];

  const links = isAdmin ? adminLinks : mainLinks;

  return (
    <>
      {links.map((link) => (
        <LinkWithUnderline
          key={link.name}
          href={link.href}
        >
          {link.name}
        </LinkWithUnderline>
      ))}
    </>
  );
};

export default HeaderLinks;
