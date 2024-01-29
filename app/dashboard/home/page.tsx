import { Label } from "reactstrap";

import Protected from "@/app/components/Protected";
import { Station } from "@/types/general";

import Dashboard from "./Dashboard";

const Home = async () => {
  let stations: Station[];

  try {
    const stationsFetched = await fetch(
      `${process.env.NODE_RED_API}/stations`,
      {
        method: "GET",
        // API_USERNAME and API_PASSWORD are set in .env.local
        headers: new Headers({
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.API_USERNAME + ":" + process.env.API_PASSWORD
            ).toString("base64"),
        }),
      }
    );

    stations = await stationsFetched.json();
  } catch (err: unknown) {
    stations = [];
    console.log(err);
  }

  return (
    <main className="flex m-10 flex-col">
      <Label className="m-3 text-3xl items-start">WaterWatchers</Label>
      <Protected>
        <div>
          <h1>Dashboard</h1>
          <Dashboard stations={stations} />
        </div>
      </Protected>
    </main>
  );
};

export default Home;
