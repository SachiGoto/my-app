export async function GET(request: Request) {
  return new Response("hi");
}

export async function POST(req: Request) {
  const response = await fetch(
    "https://api.api-ninjas.com/v1/quotes?category=age",
    {
      headers: {
        "X-Api-Key": "9UFSxSHINAx0rspIOzwQlg==H05cqH5sxoNl6PP6", // Assuming the API expects the key in this header; adjust as needed,
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
