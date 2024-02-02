import { NodeRedAuthHeaders, Sensor } from "@/types/general";


const GET = async (request: Request) => {
  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");
  
  const response = await fetch(`${process.env.NODE_RED_API}/sensors`, {
    method: "GET",
    headers: headers,
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

// TODO: Add authentication, right now anyone can add a sensor to the database
// NON-SECURE ENDPOINT
const POST = async (request: Request) => {
  const sensor = (await request.json()) as Sensor;

  // TODO: Add field validation

  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${process.env.NODE_RED_API}/sensor`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      municipality: sensor.municipality,
      station_name: sensor.station_name,
      mac_address: sensor.mac_address,
      longitude: sensor.longitude,
      latitude: sensor.latitude,
      image: sensor.image
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

const PUT = async (request: Request) => {
  const sensor: Sensor = await request.json();

  // TODO : Add field validation

  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");

  console.log(sensor);

  const response = await fetch(`${process.env.NODE_RED_API}/sensor`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      id: sensor.id,
      municipality: sensor.municipality,
      station_name: sensor.station_name,
      mac_address: sensor.mac_address,
      longitude: sensor.longitude ?? 0,
      latitude: sensor.latitude ?? 0,
      image: sensor.image
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

const DELETE = async (request: Request) => {
  const sensor: Sensor = await request.json();

  // TODO : Add field validation

  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Content-Type", "application/json");
  const response = await fetch(`${process.env.NODE_RED_API}/sensor`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify({
      id: sensor.id,
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

export { GET, POST, PUT, DELETE };
