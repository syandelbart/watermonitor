"use client";

import { useRouter } from "next/navigation";
import { Label } from "reactstrap";

export default function Home() {
  const router = useRouter();

  return (
      <main className="flex m-10 flex-col">
        <Label className="m-3 text-3xl items-start">WaterWatchers</Label>
      </main>
  );
}
