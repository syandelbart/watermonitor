import Protected from "./componets/Protected";

const Home = () => {
  return (
    <Protected>
      <div>
        <h1>Home</h1>
      </div>
    </Protected>
  );
};

export default Home;
