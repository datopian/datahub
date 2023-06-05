import { Header } from '../Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
