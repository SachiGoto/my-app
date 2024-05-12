export async function POST(req: Request) {
  // const API_KEY = process.env.API_KEY;
  const API_KEY = "9UFSxSHINAx0rspIOzwQlg==H05cqH5sxoNl6PP6";
  console.log("api key from env ", API_KEY);
  const response = await fetch(
    "https://api.api-ninjas.com/v1/quotes?category=amazing",
    {
      headers: {
        "X-Api-Key": API_KEY,
        cashe: "no-store", // This will help prevent caching
        Pragma: "no-cache", // For older HTTP/1.0 servers
        Expires: "0", // Proxies
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },

      // const dynamicData = await fetch(`https://...`, { cache: 'no-store' })
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const body = await response.json();
  return new Response(JSON.stringify(body));
}
