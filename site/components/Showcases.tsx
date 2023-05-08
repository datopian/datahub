import Container from './Container';
import ShowcasesItem from './ShowcasesItem';

const items = [
  {
    title: 'Open Data Northern Ireland',
    href: 'https://www.opendatani.gov.uk/',
    image: '/images/showcases/odni.png',
    description: 'Government Open Data Portal',
  },
  {
    title: 'Birmingham City Observatory',
    href: 'https://www.cityobservatory.birmingham.gov.uk/',
    image: '/images/showcases/birmingham.png',
    description: 'Government Open Data Portal',
  },
  {
    title: 'UAE Open Data',
    href: 'https://opendata.fcsc.gov.ae/',
    image: '/images/showcases/uae.png',
    description: 'Government Open Data Portal',
    sourceUrl: 'https://github.com/FCSCOpendata/frontend',
  },
  {
    title: 'Datahub Open Data',
    href: 'https://opendata.datahub.io/',
    image: '/images/showcases/datahub.png',
    description: 'Demo Data Portal by DataHub',
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
      <p className="text-lg mt-8">Discover what's being powered by PortalJS</p>
      <div className="not-prose my-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          return <ShowcasesItem item={item} />;
        })}
      </div>
    </Container>
  );
}
