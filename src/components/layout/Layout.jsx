import Navbar from './Navbar';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-yellow-500/20 selection:text-yellow-300">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        {children}
      </main>
    </div>
  );
}

export default Layout;
