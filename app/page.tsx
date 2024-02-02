'use client'
import { redirect } from 'next/navigation'
import { useUser } from "@auth0/nextjs-auth0/client";

const Home = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if(!user)
  {
    redirect('/api/auth/login');
  }
  else{
    redirect('/dashboard/home')
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
