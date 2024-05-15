export async function POST(req: Request) {
  //TODO need to figure out why env variable is not working
  // const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // const API_KEY = "9UFSxSHINAx0rspIOzwQlg==H05cqH5sxoNl6PP6";
  // console.log("api key from env ", API_KEY);
  // const API_KEY = process.env.NEXT_PUBLIC_API_KEY?.trim();
  // console.log("Type of API Key: ", typeof process.env.NEXT_PUBLIC_API_KEY);

  const response = await fetch(
    "https://api.api-ninjas.com/v1/quotes?category=amazing",
    {
      headers: {
        "X-Api-Key": "9UFSxSHINAx0rspIOzwQlg==H05cqH5sxoNl6PP6",
        cashe: "no-store",
        Pragma: "no-cache",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data!");
  }

  const body = await response.json();
  return new Response(JSON.stringify(body));
}
