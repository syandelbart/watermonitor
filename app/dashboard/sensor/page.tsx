import { Label } from "reactstrap";

import { Municipality, NodeRedAuthHeaders } from "@/types/general";

import Form from "../../components/SensorForm";

const Page = async () => {
  let municipalities: Municipality[];

  try {
    municipalities = await fetch(`${process.env.NODE_RED_API}/municipalities`, {
      headers: NodeRedAuthHeaders,
    }).then((res) => res.json());
  } catch (err: unknown) {
    municipalities = [];
    console.log(err);
  }

  return (
    <main className="flex m-3 flex-col">
      <Label className="m-2 text-3xl items-start">WaterWatchers</Label>
      <Form municipalities={municipalities} />
    </main>
  );
};

export default Page;
