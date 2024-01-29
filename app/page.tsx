import Protected from "./components/Protected";
import Navigation from "./components/NavBar";

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
