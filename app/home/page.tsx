"use client";
import { getAuth, signOut } from 'firebase/auth';
import '../../config/firebase';
import  useAuthentication  from '../../hooks/use_authentication';
import {Label} from 'reactstrap';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()


return (
  <main className="flex m-10 flex-col"> 
    <Label className="m-3 text-3xl items-start">WaterWatchers</Label>
    
  </main>);
}