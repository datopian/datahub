import { Nav } from 'portal';

const NavBar: React.FC = () => {
  const navMenu = [
    { title: 'Blog', path: '/blog' },
    { title: 'Search', path: '/search' },
    { title: 'Docs', path: 'http://tech.datopian.com/frontend/' },
    { title: 'GitHub', path: 'https://github.com/datopian/portal' },
  ];

  return <Nav logo={'/images/logo.svg'} navMenu={navMenu} />;
};

export default NavBar;
