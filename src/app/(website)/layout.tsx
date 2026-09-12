import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { FloatingConnect } from "../../components/layout/floating-connect";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen">
        {children}
      </main>

      <FloatingConnect />

      <Footer />
    </>
  );
}