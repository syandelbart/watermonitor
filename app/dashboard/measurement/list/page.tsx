import MeasurementTable from "@/app/components/Measurement/list/MeasurementTable";
import { Measurement, NodeRedAuthHeaders } from "@/types/general";

const List = async () => {
  const measurements: Measurement[] = await fetch(
    `${process.env.NODE_RED_API}/measurements`,
    {
      headers: NodeRedAuthHeaders,
      next: {
        revalidate: 0,
      },
    }
  ).then((res) => res.json());

  return (
    <div>
      <div>
        <MeasurementTable measurementData={measurements} />
      </div>
    </div>
  );
};

export default List;
