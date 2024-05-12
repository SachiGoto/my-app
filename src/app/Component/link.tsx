import React from "react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

type linkProps = {
  children: React.ReactNode;
  href: string;
};

export function LinkComp({ children, href }: linkProps) {
  return (
    <Button ml="5%" variant="solid" colorScheme="pink">
      <ChakraLink as={Link} href={href} _hover={{ textDecoration: "none" }}>
        {children}
      </ChakraLink>
    </Button>
  );
}
