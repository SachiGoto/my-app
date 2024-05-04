"use client";
import { Modal } from "./index";
import { useState, useEffect } from "react";
type Quote = [
  {
    quote: string;
    author: string;
    category: string;
  }
];

type Error = {
  error: string;
};

async function getData() {
  const response = await fetch("http://localhost:3000/api/quote", {
    method: "POST",
  });

  return response.json();
}

async function saveData(quote: Quote) {
  try {
    const quoteData = {
      quote: quote[0].quote,
      category: quote[0].category,
      author: quote[0].author,
      created_at: new Date().toISOString(),
    };

    console.log("quote format", JSON.stringify(quoteData));
    const response = await fetch("http://localhost:8080/api/quotes/addQuote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quoteData),
    });
    if (response.ok) {
      // const jsonResponse = await response;
      // console.log("adding quote response:", jsonResponse);
      return response;
    } else {
      throw new Error("HTTP status " + response);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw to be caught in handleSubmit
  }
}

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(true);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const generateQuote = async () => {
    console.log("clicked");
    try {
      setLoading(true);
      const result = await getData();
      setQuote(result);
      setError(null);
      console.log("Handle submit:", result);
    } catch (error: any) {
      console.error("Error posting data:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const saveQuote = async () => {
    console.log("clicked", quote);

    const result = await saveData(quote);
  };
  // This useEffect is just for debugging purposes to log the state when it updates
  useEffect(() => {
    if (quote) {
      console.log("Quote state updated:", quote[0]);
    }
  }, [quote]);

  useEffect(() => {
    if (loading) {
      console.log("it's loading");
    }
  }, [loading]);

  console.log("quote", quote);
  return (
    <>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Positive Quote Generator
          </h1>
          {loading && <p className="absolute">Loading...</p>}
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Hit the button below to get positive quotes to start your day!
          </p>

          <Modal text="Get a Quote" onClick={generateQuote} />

          {/* <div className="mt-10 flex items-center justify-center gap-x-6">
            {quote && <p>{quote[0].quote}</p>}
            {error && <p>Error: {error}</p>}

            {quote && (
              <button onClick={saveQuote}>
                Save the quote to your favourite list
              </button>
            )} */}
          {/* <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
