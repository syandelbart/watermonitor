import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Measurement, NodeRedAuthHeaders } from "@/types/general";

const List = async () => {
  const headers = new Headers(NodeRedAuthHeaders);
  headers.set("Cache-Control", "no-cache");
  const measurements: Measurement[] = await fetch(
    `${process.env.NODE_RED_API}/measurements`,
    {
      headers,
    }
  ).then((res) => res.json());

  return (
    <div>
      <h1>Measurement List</h1>
      <div>
        <Table>
          <TableCaption>
            A table of all the measurements in the system.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Measurement</TableHead>
              <TableHead>Moment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurements.map((measurement) => (
              <TableRow key={measurement.id}>
                <TableCell>{measurement.id}</TableCell>

                <TableCell>{measurement.moment}</TableCell>
                <TableCell>
                  {measurement.result} {measurement.measurement}
                </TableCell>
                <TableCell>{/* Actions */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default List;
