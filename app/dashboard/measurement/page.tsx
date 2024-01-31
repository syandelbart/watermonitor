import { Label } from "reactstrap";

import { NodeRedAuthHeaders, Sensor } from "@/types/general";

import Form from "../../components/Measurement/Form";

const Measurement = async () => {
  const sensors: Sensor[] = await fetch(`${process.env.NODE_RED_API}/sensors`, {
    method: "GET",
    headers: NodeRedAuthHeaders,
  }).then((res) => res.json());

  return (
    <main className="flex m-3 flex-col">
      <Label className="m-2 text-3xl items-start">WaterWatchers</Label>
      <Form sensors={sensors} />
    </main>
  );
};

export default Measurement;
