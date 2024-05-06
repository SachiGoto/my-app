"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Card, CardBody, Text, Box } from "@chakra-ui/react";
// http://localhost:8080/api/quotes/getQuotes

type Quote = [
  {
    quote: string;
    author: string;
    category: string;
  }
];

export default function Page() {
  const [favQuotes, setFavQuotes] = useState<Quote | null>(null);
  async function getFavouriteQuotes() {
    const response = await fetch(
      "http://localhost:8080/api/quotes/getQuotes"
    ).then((response) => response.json());

    console.log("get all favourites ", response);
    return response;
  }

  useEffect(() => {
    getFavouriteQuotes().then((response) => {
      setFavQuotes(response);
    });
  });

  getFavouriteQuotes();
  return (
    <Container>
      {favQuotes?.map((quote, index) => (
        <Box
          key={index}
          p={5}
          shadow="md"
          borderWidth="1px"
          mb={4}
          borderRadius="md"
          bg="white"
        >
          <Text fontSize="xl">{quote.quote}</Text>
          <Text fontWeight="bold">- {quote.author}</Text>
          <Text fontSize="sm" color="gray.500">
            {quote.category}
          </Text>
        </Box>
      ))}
    </Container>
  );
}
