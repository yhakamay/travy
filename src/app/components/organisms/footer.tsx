import { BsGithub, BsTwitter } from "react-icons/bs";
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Text,
} from "../atoms/my_chakra_components";

export default function Footer() {
  return (
    <Box as="footer" bg="bg-surface" py="16">
      <Container py={{ base: "3", lg: "4" }}>
        <HStack justify="space-between">
          <Text>
            Powerd by&nbsp;
            <Link
              href="https://openai.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI
            </Link>
            &nbsp;and&nbsp;
            <Link
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </Link>
            .
          </Text>
          <Flex>
            <Link
              href="https://github.com/yhakamay/travy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub />
            </Link>
            <Box w="4" />
            <Link
              href="https://twitter.com/yhakamay"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter />
            </Link>
          </Flex>
        </HStack>
      </Container>
    </Box>
  );
}
