import { AnalyticsWrapper } from "./components/atoms/analytics";
import { Container } from "./components/atoms/my_chakra_components";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import MyChakraProvider from "./my_chakra_provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <MyChakraProvider>
          <Header />
          <Container>{children}</Container>
          <Footer />
        </MyChakraProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
