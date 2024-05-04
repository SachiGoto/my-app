// export async function POST(req: Request) {
//   const quote = await req.json();

//   const quoteData = {
//     quote: quote.addingQuote[0].quote,
//     category: quote.addingQuote[0].category,
//     author: quote.addingQuote[0].author,
//     created_at: new Date().toISOString(),
//   };

//   console.log(quoteData);

//   const response = await fetch("http://localhost:8080/api/quotes/addQuote", {
//     method: "POST",
//     headers: {
//       cashe: "no-store", // This will help prevent caching
//       Pragma: "no-cache", // For older HTTP/1.0 servers
//       Expires: "0", // Proxies
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//     body: JSON.stringify(quoteData),
//   });

//   if (!response) {
//     throw new Error("Failed to fetch data");
//   }

//   //   const body = await response.json();
//   return new Response(JSON.stringify(quoteData));
// }
