import Protected from "./componets/Protected";
import Navigation from "./componets/NavBar";

const Home = () => {
  return (
    <Protected>
      <Navigation />
      <div>
        <h1>Home</h1>
      </div>
    </Protected>
  );
};

export default Home;
