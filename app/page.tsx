import { redirect } from 'next/navigation'

const Home = () => {
  
    redirect('/dashboard/home')
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
