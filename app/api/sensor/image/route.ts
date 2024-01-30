import { NodeRedAuthHeaders } from "@/types/general";

const POST = async (req: Request) => {
  // Check if is formdata
  if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
    return new Response("Invalid request", { status: 400 });
  }

  const formData = await req.formData();

  const id = formData.get("id");
  const image = formData.get("image") as File;

  if (!image) return new Response("Invalid image", { status: 400 });
  if (image.size == 0) return new Response("Invalid image", { status: 400 });

  // Check if id is valid and is a number
  if (!id || isNaN(Number(id))) {
    return new Response("Invalid id", { status: 400 });
  }

  const headers = new Headers(NodeRedAuthHeaders);

  const postFormData = new FormData();
  postFormData.append("sensorID", id);
  postFormData.append("image", image);

  const response = await fetch(`${process.env.NODE_RED_API}/sensorimage`, {
    method: "POST",
    headers,
    body: postFormData,
  });

  console.log(response);

  return new Response(JSON.stringify("Success")), { status: 200 };
};

export { POST };
