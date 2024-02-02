import { Suspense } from "react";

import { Municipality, NodeRedAuthHeaders } from "@/types/general";

import Form from "../../components/Sensor/Form";

const Page = async () => {
  let municipalities: Municipality[];

  try {
    municipalities = await fetch(`${process.env.NODE_RED_API}/municipalities`, {
      headers: NodeRedAuthHeaders,
    }).then((res) => res.json());
  } catch (err: unknown) {
    municipalities = [];
  }

  return (
    <main className="flex m-3 flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Form municipalities={municipalities} />
      </Suspense>
    </main>
  );
};

export default Page;
