import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
