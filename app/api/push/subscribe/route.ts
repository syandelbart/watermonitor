import { NodeRedAuthHeaders } from "@/types/general";

const POST = async (req: Request) => {
  const subscriptionTest = await req.json();
  // console.log(subscriptionTest);
  // TODO: Push subscription to database

  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${process.env.NEXT_PUBLIC_NODE_RED_API}/push`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(subscriptionTest),
  });

  if (!response.ok) {
    return new Response("Error: " + response.statusText, {
      status: response.status,
    });
  }

  return new Response(JSON.stringify(subscriptionTest));

  // Save subscription to database
};

export { POST };
