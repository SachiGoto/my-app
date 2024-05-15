"use client";
import { QuoteModal, LinkComp } from "./Component";
import { Flex, Heading, VStack, Text, AbsoluteCenter } from "@chakra-ui/react";

export default function Home() {
  return (
    <AbsoluteCenter w="80%">
      <VStack>
        <Heading textAlign="center" size="3xl">
          Quotes Generator
        </Heading>
        <Text textAlign="center" mt="6">
          Hit the button below to find positive quotes to brighten yoru day!
        </Text>
        <Flex align="center" justify="center" mt="5%">
          <QuoteModal />
          <LinkComp href="/favourites">Favourites</LinkComp>
        </Flex>
      </VStack>
    </AbsoluteCenter>
  );
}
