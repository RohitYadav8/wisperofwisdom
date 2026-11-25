import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { FloatingConnect } from "../../components/layout/floating-connect";
import { EnquiryPopup } from "../../components/popup/enquiry-popup";
import { wowFontVars } from "../../features/home/home-shell";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* wow-tokens + fonts: lets the navbar and footer use the redesign colours */
    <div className={`wow-tokens ${wowFontVars}`}>
      <Navbar />

      <main className="relative min-h-screen">
        {children}
      </main>

      <FloatingConnect />

      <Footer />

      <EnquiryPopup />
    </div>
  );
}
