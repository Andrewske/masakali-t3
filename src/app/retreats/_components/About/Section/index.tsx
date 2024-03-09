import Image from 'next/image';

type Section = {
  title: string;
  imageUrl: string;
  listItems: string[];
  boldText?: { [key: number]: string };
};

export default function Section({
  section,
  isList = true,
  index,
}: {
  section: Section;
  isList?: boolean;
  index: number;
}) {
  const isOdd = index % 2 === 0;

  const elements = [
    <div
      key={`${section.title}-image`}
      className="h-full sm:w-[650px] max-w-[650px]"
    >
      <Image
        src={section.imageUrl}
        alt="Akasha Pool"
        width={1000}
        height={1000}
        className="object-cover object-center w-full h-full"
      />
    </div>,
    <div
      id="included-details"
      key={`${section.title}-details`}
      className="flex flex-col h-full max-w-[650px] justify-center items-center gap-8 px-4 py-8 bg-gray "
    >
      <h2>{section.title}</h2>
      {isList ? (
        <ul className="list-disc px-4 text-left ">
          {section.listItems.map((item) => (
            <li
              key={item}
              className="text-sm py-1"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <span className="flex flex-col gap-2">
          {section.listItems.map((item, i) => {
            if (section.boldText && section.boldText[i]) {
              return (
                <p
                  key={item}
                  className="px-4 text-left text-sm"
                >
                  <span className="font-bold">{section.boldText[i]}</span>{' '}
                  {item}
                </p>
              );
            }
            return (
              <p
                key={item}
                className="px-4 text-left text-sm "
              >
                {item}
              </p>
            );
          })}
        </span>
      )}
    </div>,
  ];

  if (!isOdd) {
    elements.reverse();
  }
  return (
    <div
      key={section.title}
      id={section.title}
      className="relative h-full xl:h-[650px] flex flex-wrap justify-center items-center"
    >
      {elements}
    </div>
  );
}
