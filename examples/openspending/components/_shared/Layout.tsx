import { Header } from '../Header';

export default function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      {children}
    </div>
  );
}
