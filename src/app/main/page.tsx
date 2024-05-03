"use client";
import { useEffect, useState } from "react";

// Corrected type definition
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

async function postData() {
  try {
    const response = await fetch("http://localhost:3000/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("JSON response:", jsonResponse);
      return jsonResponse;
    } else {
      throw new Error("HTTP status " + response.status);
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
      const result = await postData();
      setQuote(result);
      setError(null);
      console.log("Handle submit:", result);
    } catch (error: any) {
      console.error("Error posting data:", error);
      setError("Something went wrong");
    }
  };

  const saveQuote = async (quote: Quote) => {
    console.log("clicked", quote);
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
      {quote ? <p>{quote[0].quote}</p> : <p>No quote loaded</p>}
      {error && <p>Error: {error}</p>}

      {quote && (
        <button onClick={() => saveQuote(quote)}>
          Save the quote to your favourite list
        </button>
      )}
    </main>
  );
}
