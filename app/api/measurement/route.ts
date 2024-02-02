import { Measurement, NodeRedAuthHeaders } from "@/types/general";

const GET = async (request: Request) => {
  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${process.env.NODE_RED_API}/measurements`, {
    method: "GET",
    headers: headers,
  });

  console.log(response);

  try {
    const data = await response.json();
    console.log(data);
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

const POST = async (request: Request) => {
  const measurement = (await request.json()) as Measurement;

  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${process.env.NODE_RED_API}/measurement`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      sensor_id: measurement.sensor_id,
      moment: measurement.moment,
      measurement: measurement.measurement,
      result: measurement.result,
    } as Measurement),
  });

  try {
    const data = await response.json();
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

const DELETE = async (request: Request) => {
  const measurement: Measurement = await request.json();

  // TODO : Add field validation

  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");
  const response = await fetch(`${process.env.NODE_RED_API}/measurement`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify({
      id: measurement.id,
    }),
  });

  try {
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};

export { GET, POST, DELETE };
