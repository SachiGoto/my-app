"use client";
import { Link } from "@chakra-ui/next-js";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { LandingPage } from "./Component";
import { theme } from "./Theme";

export default function Home() {
  return (
    <main>
      <LandingPage />
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
    </main>
  );
}
