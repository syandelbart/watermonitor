"use client";
import { getAuth, signOut } from 'firebase/auth';
import '../../config/firebase';
import  useAuthentication  from '../../hooks/use_authentication';
import {Label} from 'reactstrap';
import { useRouter } from 'next/navigation'
const auth = getAuth();

export default function home() {
  const { user } = useAuthentication();
  const router = useRouter()
  
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        router.push('/', { scroll: false })
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

return (
  <main className="flex m-10 flex-col justify-center items-center"> 
    <Label className="m-3 text-3xl">Welcome {user?.email}!</Label>
    <button className="m-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
     title="Sign out"  onClick={() => handleLogout()} >
        Sign Out
    </button>
  </main>);
}