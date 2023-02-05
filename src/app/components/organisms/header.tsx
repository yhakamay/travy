import Image from "next/image";
import Link from "next/link";
import { Box, Container, Heading, HStack } from "../atoms/my_chakra_components";

export default function Header() {
  return (
    <Box as="section" pb={{ base: "4", md: "8" }}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container py={{ base: "3", lg: "4" }}>
          <HStack justify="space-between">
            <Link href="/">
              <HStack>
                <Image src="/logo.png" width={32} height={32} alt={"logo"} />
                <Heading size="lg">Travy</Heading>
              </HStack>
            </Link>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
