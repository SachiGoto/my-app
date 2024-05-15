import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  useToast,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { ImQuotesLeft } from "react-icons/im";
import { FaHeart } from "react-icons/fa";

type Quote = [
  {
    quote: string;
    author: string;
    category: string;
  }
];

export function QuoteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  let [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);

  const generateQuote = async () => {
    try {
      setIsLoading(true);
      const result = await fetch("http://localhost:3000/api/quote", {
        method: "POST",
      });
      const data = await result.json();
      setQuote(data);
    } catch (error: any) {
      console.error("Error posting data:", error);
      toast({
        status: "error",
        position: "top",
        title: "Generate Quote Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      onOpen();
      setIsLoading(false);
    }
  };

  const saveQuote = async () => {
    if (quote) {
      try {
        const quoteData = {
          quote: quote[0].quote,
          category: quote[0].category,
          author: quote[0].author,
          created_at: new Date().toISOString(),
        };

        const response = await fetch(
          "http://localhost:8080/api/quotes/addQuote",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(quoteData),
          }
        );

        if (response.ok) {
          toast({
            status: "success",
            position: "top",
            title: "Success",
            description: "The quote is added to your favourite list",
          });
          return response;
        } else {
          toast({
            status: "error",
            position: "top",
            title: "Error",
            description: "something went wrong",
          });
          throw new Error("HTTP status " + response);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    }
  };

  function openModal() {
    generateQuote();
  }

  return (
    <>
      <Button
        isLoading={isLoading}
        loadingText="Generating"
        type="button"
        onClick={openModal}
        colorScheme="blue"
        variant="solid"
      >
        Generate
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quote</ModalHeader>

          {quote && (
            <ModalBody>
              <Icon as={ImQuotesLeft} color="gray" my="3" />
              <Text>{quote[0].quote}</Text>
              <Icon as={ImQuotesLeft} color="gray" my="3" ml="90%" />
              <Text fontSize="sm" as="i">
                Author: {quote[0].author}
              </Text>
              <Text mt="1" fontSize="xs">
                Category: {quote[0].category}
              </Text>
            </ModalBody>
          )}

          <ModalFooter>
            <Button
              onClick={generateQuote}
              colorScheme={"telegram"}
              isLoading={isLoading}
              loadingText="Generating"
            >
              Next
            </Button>
            <Box ml={"5%"}>
              <Icon
                as={FaHeart}
                color="red"
                _hover={{ color: "#FF5733" }}
                onClick={saveQuote}
              />
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
