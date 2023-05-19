import { Header } from '../Header';

export default function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen pb-32">
      <Header />
      {children}
    </div>
  );
}
