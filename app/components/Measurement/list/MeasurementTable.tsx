"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Measurement } from "@/types/general";

const MeasurementTable = ({
  measurementData,
}: {
  measurementData: Measurement[];
}) => {
  const [measurements, setMeasurements] = useState(measurementData);

  return (
    <Table>
      <TableCaption>
        A table of all the measurements in the system.
      </TableCaption>
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

            <TableCell>{/* Actions */}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MeasurementTable;
