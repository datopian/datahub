import Container from './Container';
import GalleryItem from './GalleryItem';

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
  },
  {
    title: 'Brazil Open Data',
    href: 'https://dados.gov.br/',
    image: '/images/showcases/brazil.png',
    description: 'Government Open Data Portal',
  },
  {
    title: 'Datahub Open Data',
    href: 'https://opendata.datahub.io/',
    image: '/images/showcases/datahub.png',
    description: 'Demo Data Portal by DataHub',
  },
];

export default function Gallery() {
  return (
    <Container>
      <h2 className="text-3xl font-bold text-primary dark:text-primary-dark ">
        Gallery
      </h2>
      <p className="text-lg mt-8 ">
        Discover what's being powered by Portal.JS
      </p>
      <div className="not-prose my-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          return <GalleryItem item={item} />;
        })}
      </div>
    </Container>
  );
}
