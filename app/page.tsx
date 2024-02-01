'use client'
import { redirect } from 'next/navigation'
import { useUser } from "@auth0/nextjs-auth0/client";

const Home = () => {
  const { user } = useUser();
  if(!user)
  {
    redirect('/api/auth/login')
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
