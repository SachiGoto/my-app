"use client";
import React from "react";
import { useState, useEffect } from "react";
import { LinkComp } from "../Component/link";
import {
  Container,
  Card,
  CardBody,
  Text,
  Box,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";
// http://localhost:8080/api/quotes/getQuotes

type Quote = [
  {
    id: number;
    quote: string;
    author: string;
    category: string;
  }
];

export default function Page() {
  const toast = useToast();
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
  }, []);

  async function deleteQuote(id: number) {
    console.log("deleting id is ", id);
    const res = await fetch(
      "http://localhost:8080/api/quotes/deleteQuote/" + id,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      const message = await res.body; // Get the response body as text
      console.log(message);
      // Displaying notification when data is deleted successfully
      toast({
        position: "top",
        title: "Success!",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
    } else {
      // Displaying notification when data is not found
      toast({
        position: "top",
        title: "Somthing went wrong!",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
    }
    getFavouriteQuotes().then((response) => {
      setFavQuotes(response);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Container mt={5}>
      <Flex justifyContent="space-around" align="center" mb="5">
        <Text fontSize="lg" as="b">
          Your favourite quotes!
        </Text>
        <LinkComp href="/">Back to quotes</LinkComp>
      </Flex>

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
          <Box ml="90%">
            <FaRegTrashCan onClick={() => deleteQuote(quote.id)} />
          </Box>
        </Box>
      ))}
    </Container>
  );
}
