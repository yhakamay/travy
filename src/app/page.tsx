"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "./components/atoms/my_chakra_components";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import { ActivityType } from "./types/activity_type";

export default function Home() {
  const [time, setTime] = useState(30);
  const onTimeChange = (value: number) => setTime(value);
  const [type, setType] = useState<ActivityType>("lunch");
  const onTypeChange = (value: ActivityType) => setType(value);
  const [generatedRecipe, setGeneratedRecipe] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const prompt = `Generate a recipe for ${type} that takes ${time} minutes.`;

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
        <Text
          alignSelf="start"
          fontSize="lg"
        >{`❶ How long can you take for cooking?`}</Text>
        <Slider
          min={10}
          max={60}
          step={10}
          value={time}
          onChange={onTimeChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px">
            {time}
          </SliderThumb>
        </Slider>
        <Text alignSelf="end" fontSize="sm" color="grey">
          min
        </Text>
        <Box h={4} />
        <Text alignSelf="start" fontSize="lg">{`❷ Which meal?`}</Text>
        <Select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as ActivityType)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="sports">Sports</option>
        </Select>
        <Button
          onClick={(e) => generateRecipe(e)}
          w="full"
          rightIcon={<BsFillArrowRightCircleFill />}
          isLoading={loading}
        >
          Ask AI
        </Button>
        {generatedRecipe && (
          <Card>
            <CardBody>
              <Text>{generatedRecipe}</Text>
            </CardBody>
          </Card>
        )}
      </VStack>
    </>
  );

  async function generateRecipe(e: any) {
    if (loading) {
      return;
    }

    if (generatedRecipe) {
      setGeneratedRecipe("");
    }

    e.preventDefault();

    setLoading(true);

    console.log(prompt);

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
      setGeneratedRecipe((prev) => prev + chunk);

      console.log(chunk);
    }

    setLoading(false);
  }
}
