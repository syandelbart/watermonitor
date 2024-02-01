import { NodeRedAuthHeaders } from "@/types/general";

const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const headers = new Headers(NodeRedAuthHeaders);

  const id = params.id;

  //   Check if ID is a number
  if (isNaN(Number(id))) {
    return new Response("Error", {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  const response = await fetch(`${process.env.NODE_RED_API}/sensor?id=${id}`, {
    method: "GET",
    headers: headers,
  });

  try {
    let data = await response.json();
    // This should be removed once the API (NodeRed API) is fixed
    if (Array.isArray(data)) data = data[0];
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }

  return new Response("Error", {
    headers: { "Content-Type": "application/json" },
    status: 500,
  });
};

export { GET };
