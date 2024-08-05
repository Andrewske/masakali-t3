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
