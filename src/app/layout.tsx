import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { SkipLink } from "./components/SkipLink";
import { AccessibilityProvider } from "./components/accessibility/AccessibilityContext";
import { AccessibilityClientWrapper } from "./components/accessibility/AccessibilityClientWrapper";
import { SelectionSpeaker } from "./components/accessibility/SelectionSpeaker";

export const metadata = { title: "Accessible Communication Portal" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AccessibilityProvider>
          <SkipLink />
          <Header />
          <main
            id="main"
            tabIndex={-1}
            className="p-6 min-h-screen focus:outline-none"
          >
            <div className="max-w-4xl mx-auto">{children}</div>
          </main>
          <Footer />
          <SelectionSpeaker />
          {/* ✅ Accessibility panel now inside a client wrapper */}
          <AccessibilityClientWrapper />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
