"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Measurement } from "@/types/general";
import { useMeasurementStore } from "@/zustand";
import { Icon } from "@iconify/react/dist/iconify.js";

const MeasurementTable = ({
  measurementData,
}: {
  measurementData: Measurement[];
}) => {
  const { measurements, add, remove } = useMeasurementStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Measurement ID</TableHead>
          <TableHead>Measurement</TableHead>
          <TableHead>Moment</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {measurements.map((measurement, i) => (
          <TableRow key={measurement.id}>
            <TableCell>{i}</TableCell>
            <TableCell>{measurement.id}</TableCell>

            <TableCell>
              {measurement.result} {measurement.measurement}
            </TableCell>
            <TableCell>{measurement.moment}</TableCell>

            <TableCell className="flex text-2xl gap-2">
              <Icon
                className="cursor-pointer"
                icon="mdi:delete"
                onClick={async () => {
                  remove(measurement.id);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MeasurementTable;
