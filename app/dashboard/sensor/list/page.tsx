import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NodeRedAuthHeaders, Sensor } from "@/types/general";

const List = async () => {
  const sensors: Sensor[] = await fetch(`${process.env.NODE_RED_API}/sensors`, {
    headers: NodeRedAuthHeaders,
  }).then((res) => res.json());

  return (
    <div>
      <h1>Sensor List</h1>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Municipality</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead>Station Name</TableHead>
              <TableHead>(Longitude,Latitude)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sensors.map((sensor) => (
              <TableRow key={sensor.id}>
                <TableCell>{sensor.id}</TableCell>
                <TableCell>{sensor.municipality}</TableCell>
                <TableCell>{sensor.mac_address}</TableCell>
                <TableCell>{sensor.station_name}</TableCell>
                <TableCell>
                  ({sensor.longitude},{sensor.latitude})
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
