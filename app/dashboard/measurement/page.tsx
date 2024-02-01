import { Label } from "reactstrap";

import Form from "../../components/Measurement/Form";

const Measurement = async () => {
  return (
    <main className="flex m-3 flex-col">
      <Label className="m-2 text-3xl items-start">WaterWatchers</Label>
      <Form />
    </main>
  );
};

export default Measurement;
