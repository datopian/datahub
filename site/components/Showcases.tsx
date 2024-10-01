import Container from './Container';
import ShowcasesItem from './ShowcasesItem';

const items = [
  {
    title: 'Open Data Northern Ireland',
    href: 'https://www.opendatani.gov.uk/',
    image: '/images/showcases/odni.webp',
    description: 'Government Open Data Portal',
  },
  {
    title: 'Birmingham City Observatory',
    href: 'https://www.cityobservatory.birmingham.gov.uk/',
    image: '/images/showcases/birmingham.webp',
    description: 'Government Open Data Portal',
  },
  {
    title: 'UAE Open Data',
    href: 'https://opendata.fcsc.gov.ae/',
    image: '/images/showcases/uae.webp',
    description: 'Government Open Data Portal',
    sourceUrl: 'https://github.com/FCSCOpendata/frontend',
  },
  {
    title: 'Frictionless Data',
    href: 'https://frictionlessdata.io',
    repository: 'https://github.com/datopian/datahub/tree/main/examples/dataset-frictionless',
    image: '/images/showcases/frictionless-capture.png',
    description: 'Open-source toolkit that brings simplicity to the data experience',
  },
  {
    title: "OpenSpending",
    image: "/images/showcases/openspending.png",
    href: "https://www.openspending.org",
    repository: 'https://github.com/datopian/datahub/tree/main/examples/openspending',
    description: "Public Financial Data Portal"
  },
  
];

export default function Showcases() {
  return (
    <Container>
      <h2
        className="text-3xl font-bold text-primary dark:text-primary-dark"
        id="showcases"
      >
        Showcases
      </h2>
      <p className="text-lg mt-2">Discover what's being powered by PortalJS</p>
      <div className="not-prose my-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item) => {
          return <ShowcasesItem item={item} />;
        })}
      </div>
    </Container>
  );
}
