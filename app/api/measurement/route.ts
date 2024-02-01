import { Measurement, NodeRedAuthHeaders } from "@/types/general";

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

export { POST };
