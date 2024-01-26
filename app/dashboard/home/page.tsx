"use client";
import "../../../config/firebase";

import { useRouter } from "next/navigation";
import { Label } from "reactstrap";

import Protected from "../../componets/Protected";

export default function Home() {
  const router = useRouter();

  return (
    <Protected>
      <main className="flex m-10 flex-col">
        <Label className="m-3 text-3xl items-start">WaterWatchers</Label>
      </main>
    </Protected>
  );
}
