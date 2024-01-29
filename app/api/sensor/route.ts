import { NodeRedAuthHeaders } from "@/types/general";

// TODO: Add authentication, right now anyone can add a sensor to the database
// NON-SECURE ENDPOINT
const POST = async (request: Request) => {
  const sensor = await request.json();

  // TODO: Add field validation

  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${process.env.NODE_RED_API}/sensor`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      municipality: sensor.municipality.value,
      station_name: sensor.name,
      mac_address: sensor.mac,
      longitude: sensor.longitude,
      latitude: sensor.latitude,
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

  return new Response("Error", {
    headers: { "Content-Type": "application/json" },
    status: 500,
  });
};

export { POST };
