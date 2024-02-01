import SensorTable from "@/app/components/Sensor/list/SensorTable";
import { NodeRedAuthHeaders, Sensor } from "@/types/general";

const List = async () => {
  const sensors: Sensor[] = await fetch(`${process.env.NODE_RED_API}/sensors`, {
    headers: NodeRedAuthHeaders,
    next: {
      revalidate: 0,
    },
  }).then((res) => res.json());

  return (
    <div>
      <h1>Sensor List</h1>
      <div>
        <SensorTable sensorData={sensors} />
      </div>
    </div>
  );
};

export default List;
