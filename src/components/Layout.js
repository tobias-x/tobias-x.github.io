import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="bg-black"> {/* Apply bg-black here */}
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
