"use client";

import Image from "next/image";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Link,
  Select,
  Text,
  VStack,
} from "./components/atoms/my_chakra_components";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import { SeasonType } from "./types/season_type";

export default function Home() {
  const [city, setCity] = useState<string>("Tokyo");
  const [season, setSeason] = useState<SeasonType>("spring");
  const [suggestion, setSuggestion] = useState<string>("");
  const [lang, setLang] = useState<"en" | "ja">("en");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <VStack spacing="4">
        <Box h={16} />
        <Heading
          fontWeight="black"
          textAlign="center"
          size="2xl"
        >{`Ask GPT-3 where to go this weekend.`}</Heading>
        <Image src="/travel.svg" width={200} height={200} alt={"travel"} />
        <Box h={4} />
        <Text alignSelf="start" fontSize="lg">{`❶ Where?`}</Text>
        <Input value={city} onChange={(e) => setCity(e.target.value)} />
        <Text alignSelf="start" fontSize="lg">{`❷ When?`}</Text>
        <Select
          value={season}
          onChange={(e) => setSeason(e.target.value as SeasonType)}
        >
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
        </Select>
        <Text alignSelf="start" fontSize="lg">{`❸ Language?`}</Text>
        <Select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "ja")}
        >
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </Select>
        <Button
          onClick={(e) => suggestPlan(e)}
          w="full"
          rightIcon={<BsFillArrowRightCircleFill />}
          isLoading={loading}
          color="white"
          bgColor="black"
          _hover={{ bgColor: "gray.700" }}
        >
          Ask GPT-3
        </Button>
        {suggestion && (
          <Alert borderRadius="md">
            <AlertIcon />
            <VStack spacing="2" align="start">
              <Text>
                {lang === "en"
                  ? "Check out TraPay to split the bill after your travel!"
                  : "割り勘アプリ TraPay もあります。旅行の後に使ってみてね！"}
              </Text>
              <Link
                href={
                  lang === "en"
                    ? "https://www.trapay.app/"
                    : "https://www.trapay.app/ja"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === "en"
                  ? "https://www.trapay.app/"
                  : "https://www.trapay.app/ja"}
              </Link>
            </VStack>
          </Alert>
        )}
        {lang === "ja" && (
          <Alert borderRadius="md">
            <AlertIcon />
            <VStack spacing="2" align="start">
              <Text>
                Next.js
                のベータ機能を使用している関係で、アプリ全体を日本語にすることができません。妥協案として、回答だけを日本語にしてみました。詳しくはこちらをご覧ください
              </Text>
              <Link
                href={"https://beta.nextjs.org/docs/app-directory-roadmap"}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://beta.nextjs.org/docs/app-directory-roadmap
              </Link>
            </VStack>
          </Alert>
        )}
        {suggestion && (
          <Card w="full">
            <CardBody>
              <Text>{suggestion}</Text>
            </CardBody>
          </Card>
        )}
      </VStack>
    </>
  );

  async function suggestPlan(e: any) {
    if (loading) {
      return;
    }

    if (suggestion) {
      setSuggestion("");
    }

    e.preventDefault();

    setLoading(true);

    const prompt = `Suggest a one-day travel plan at ${city} in ${season}. Do not use bullet points or numbers. Please answer in ${lang}.`;

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = res.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunk = decoder.decode(value);
      setSuggestion((prev) => prev + chunk);
    }

    setLoading(false);
  }
}
