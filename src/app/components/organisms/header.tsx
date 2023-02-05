import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
} from "../atoms/my_chakra_components";

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
            <Link
              href={"https://github.com/yhakamay/travy"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton
                variant="link"
                icon={<BsGithub />}
                aria-label={"github"}
              />
            </Link>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
