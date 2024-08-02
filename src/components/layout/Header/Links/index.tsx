import LinkWithUnderline from '~/components/LinkWithUnderline';

const HeaderLinks = () => {
  const links = [
    { name: 'Home', href: `/` },
    { name: 'Villas', href: `/villas` },
    { name: 'Experience', href: `/experience` },
    { name: 'Yoga', href: `/yoga` },
    { name: 'Retreats', href: `/retreats` },
  ];

  return (
    <nav className="flex flex-grow flex-wrap items-center gap-16 text-center justify-center font-montserrat uppercase">
      {links.map((link) => (
        <LinkWithUnderline
          key={link.name}
          href={link.href}
        >
          {link.name}
        </LinkWithUnderline>
      ))}
    </nav>
  );
};

export default HeaderLinks;
