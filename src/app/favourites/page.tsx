"use client";
import { useState, useEffect } from "react";
import { LinkComp } from "../Component/link";
import { Container, Text, Box, useToast, Flex } from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";

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
      toast({
        position: "top",
        title: "Success!",
        status: "success",
        duration: 3000,
        isClosable: false,
      });
    } else {
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
