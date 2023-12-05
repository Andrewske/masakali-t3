import Template from '../_components/Template';

function Page() {
  const villaName = 'jala';
  const description = 'description';
  const amenities = 'amenities';

  return (
    <Template
      description={description}
      amenities={amenities}
      villaName={villaName}
    />
  );
}
export default Page;
