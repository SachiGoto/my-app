"use client";
import { useEffect, useState } from "react";

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

export default function Page() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQuote = async () => {
    try {
      const result = await getData();
      setQuote(result);
      setError(null);
      console.log("Handle submit:", result);
    } catch (error: any) {
      console.error("Error posting data:", error);
      setError("Something went wrong");
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

  console.log("quote", quote);
  return (
    <main>
      <button onClick={generateQuote}>Get a Quote</button>
      {quote && quote.length > 0 && <p>{quote[0].quote}</p>}
      {error && <p>Error: {error}</p>}

      {quote && (
        <button onClick={saveQuote}>
          Save the quote to your favourite list
        </button>
      )}
    </main>
  );
}
