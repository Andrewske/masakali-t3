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
    { name: 'Invoices', href: `/admin/xendit/invoices` },
    { name: 'Email', href: `/admin/email/send_confirmation` },
  ];

  const links = isAdmin ? adminLinks : mainLinks;

  return (
    <div
      key={isAdmin ? 'admin-links' : 'main-links'}
      className="flex flex-wrap items-center gap-4 text-center justify-center font-montserrat uppercase px-8"
    >
      {links.map((link) => (
        <LinkWithUnderline
          key={link.name}
          href={link.href}
        >
          {link.name}
        </LinkWithUnderline>
      ))}
    </div>
  );
};

export default HeaderLinks;
