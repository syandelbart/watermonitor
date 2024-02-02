import Protected from "@/app/components/Protected";
import { NodeRedAuthHeaders, Station } from "@/types/general";

import Dashboard from "../../components/Dashboard/home/Dashboard";

const Home = async () => {
  let stations: Station[];

  try {
    const stationsFetched = await fetch(
      `${process.env.NODE_RED_API}/stations`,
      {
        headers: NodeRedAuthHeaders,
      }
    );

    stations = await stationsFetched.json();
  } catch (err: unknown) {
    stations = [];
    console.log(err);
  }

  return (
    <main className="flex m-10 flex-col">
      <Protected>
        <div>
          <h1 className="text-4xl">Dashboard</h1>
          <Dashboard stations={stations} />
        </div>
      </Protected>
    </main>
  );
};

export default Home;
